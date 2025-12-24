import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import z from "zod";
import { InvalidShortUrl } from "./errors/invalid-shorturl-format";
import { LinkAlreadyExistsError } from "./errors/link-already-exists";

const createLinkInput = z.object({
    originalUrl: z.string().url(),
    shortUrl: z.string().regex(/^[a-z0-9-]+$/),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

type CreateLinkOutput = typeof schema.links.$inferSelect; 

export async function createLink(
    input: CreateLinkInput,
): Promise<Either<InvalidShortUrl | LinkAlreadyExistsError, CreateLinkOutput>> {

    const parseResult = createLinkInput.safeParse(input);
    if (!parseResult.success) {
        return makeLeft(new InvalidShortUrl());
    }

    const { originalUrl, shortUrl } = parseResult.data;

    const existingShortLink = await db.query.links.findFirst({
        where: (links, { eq }) => eq(links.shortUrl, shortUrl),
    });

    if (existingShortLink) {
        return makeLeft(new LinkAlreadyExistsError(shortUrl));
    }

    const link = await db
        .insert(schema.links)
        .values({
            originalUrl,
            shortUrl,
        })
        .returning();

    return makeRight(link[0]);
}