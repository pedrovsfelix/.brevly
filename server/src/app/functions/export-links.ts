import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { type Either, makeRight } from "@/shared/either";
import { stringify } from "csv-stringify";
import { ilike } from "drizzle-orm";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import z from "zod";

const exportUploadsInput = z.object({
	searchQuery: z.string().optional(),
});

type ExportUploadsInput = z.input<typeof exportUploadsInput>;

type ExportUploadsOutput = {
	reportLinks: string;
};

export async function exportUploads(
	input: ExportUploadsInput,
): Promise<Either<never, ExportUploadsOutput>> {
	const { searchQuery } = exportUploadsInput.parse(input);

	const { sql, params } = db
		.select({
			id: schema.links.id,
			originalUrl: schema.links.originalUrl,
			shortUrl: schema.links.shortUrl,
			accessClick: schema.links.accessClick,
			createdAt: schema.links.createdAt,
		})
		.from(schema.links)
		.where(
			searchQuery
				? ilike(schema.links.originalUrl, `%${searchQuery}%`)
				: undefined,
		)
		.toSQL();

	const cursor = pg.unsafe(sql, params as string[]).cursor(2);

	const csv = stringify({
		delimiter: ",",
		header: true,
		columns: [
			{ key: "id", header: "ID" },
			{ key: "original_url", header: "URL Original" },
			{ key: "short_url", header: "URL Encurtada" },
			{ key: "access_click", header: "Contagem de Acessos" },
			{ key: "created_at", header: "Data de Criação" },
		],
	});

	const uploadToStorageStream = new PassThrough();

	const convertToCSVPipeline = pipeline(
		cursor,
		new Transform({
			objectMode: true,
			transform(chunks: unknown[], encoding, callback) {
				for (const chunk of chunks) {
					this.push(chunk);
				}

				callback();
			},
		}),
		csv,
		uploadToStorageStream,
	);

	const uploadToStorage = uploadFileToStorage({
		contentType: "text/csv",
		folder: "downloads",
		fileName: `${new Date().toISOString()}-links.csv`,
		contentStream: uploadToStorageStream,
	});

	const [{ links }] = await Promise.all([
		uploadToStorage,
		convertToCSVPipeline,
	]);

	return makeRight({ reportLinks: links });
}
