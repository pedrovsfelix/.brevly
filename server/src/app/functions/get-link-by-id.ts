import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import { sql } from "drizzle-orm";
import z from "zod";
import { InvalidLink } from "./errors/invalid-link";

const getLinkBySlugInput = z.object({
    shortUrl: z.string(),
});

type GetLinkBySlugInput = z.input<typeof getLinkBySlugInput>;

type GetLinkBySlugOutput = {
    originalUrl: string;
};

export async function getLinkById(
    input: GetLinkBySlugInput,
): Promise<Either<InvalidLink, GetLinkBySlugOutput>> {
    const { shortUrl } = getLinkBySlugInput.parse(input);

    const link = await db.query.links.findFirst({
        where: (links, { eq }) => eq(links.shortUrl, shortUrl),
    });

    if (!link) {
        return makeLeft(new InvalidLink());
    }

    await db
        .update(schema.links)
        .set({
            accessClick: sql`${schema.links.accessClick} + 1`,
        })
        .where(sql`${schema.links.id} = ${link.id}`);

    return makeRight({
        originalUrl: link.originalUrl,
    });
}