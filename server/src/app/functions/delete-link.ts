import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import z from "zod";
import { InvalidLink } from "./errors/invalid-link";

const deleteLinkInput = z.object({
	id: z.string(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(
	input: DeleteLinkInput,
): Promise<Either<InvalidLink, void>> {
	const { id } = deleteLinkInput.parse(input);

	const link = await db.query.links.findFirst({
		where: (links, { eq }) => eq(links.id, id),
	});

	if (!link) {
		return makeLeft(new InvalidLink());
	}

	await db.delete(schema.links).where(eq(schema.links.id, id));

	return makeRight(undefined);
}
