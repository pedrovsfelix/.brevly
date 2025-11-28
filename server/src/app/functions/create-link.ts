import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import z from "zod";
import { InvalidShortUrl } from "./errors/invalid-shorturl-format";
import { LinkAlreadyExistsError } from "./errors/link-already-exists";

const createLinkInput = z.object({
    originalUrl: z.string().url(),
    shortUrl: z.string().regex(/^[a-z0-9-]+$/, {
        message:
            "Não deve ser possível criar um link com URL encurtada mal formatada",
    }),
});

type CreateLinkInput = z.input<typeof createLinkInput>;

type CreateLinkOutput = {
    id: string;
};

export async function createLink(
    input: CreateLinkInput,
): Promise<Either<InvalidShortUrl | LinkAlreadyExistsError, CreateLinkOutput>> {
    
    const { originalUrl, shortUrl } = createLinkInput.parse(input);

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

    return makeRight({
        id: link[0].id,
    });
}