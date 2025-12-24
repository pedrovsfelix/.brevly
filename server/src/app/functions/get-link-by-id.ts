import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";

import { or, sql } from "drizzle-orm";
import z from "zod";
import { InvalidLink } from "./errors/invalid-link";

const getLinkByIdInput = z.object({
    id: z.string(),
});

type GetLinkByIdInput = z.input<typeof getLinkByIdInput>;

type GetLinkByIdOutput = {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessClick: number;
    createdAt: string;
};

export async function getLinkById(
    input: GetLinkByIdInput,
): Promise<Either<InvalidLink, GetLinkByIdOutput>> {
    const { id } = getLinkByIdInput.parse(input);

    const link = await db.query.links.findFirst({
        where: (links, { eq }) => or(
            eq(links.id, id),
            eq(links.shortUrl, id)
        ),
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
        id: link.id,
        originalUrl: link.originalUrl,
        shortUrl: link.shortUrl,
        accessClick: link.accessClick + 1,
        createdAt: link.createdAt.toISOString(),
    });
}
