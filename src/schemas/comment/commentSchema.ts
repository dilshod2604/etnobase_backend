import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const commentSchema = z.object({
  id: z.number().int(),
  newsId: z.number().int(),
  userId: z.number().int(),
  text: z.string(),
  likes: z.number().int().default(0),
  dislikes: z.number().int().default(0),
});

const AddCommentsSchema = commentSchema.omit({
  dislikes: true,
  likes: true,
  id: true,
});

const UppdateCommentsLikesSchema = commentSchema.pick({
  likes: true,
  dislikes: true,
});

const CommentResponseSchema = z.object({
  message: z.string(),
});

const getAllCommentsResponseSchema = z.array(
  commentSchema.extend({
    userName: z.string(),
  })
);
export type CreateCommentInput = z.infer<typeof AddCommentsSchema>;
export type UpdateCommentInput = z.infer<typeof UppdateCommentsLikesSchema>;

export const { schemas: CommentSchema, $ref } = buildJsonSchemas(
  {
    AddCommentsSchema,
    UppdateCommentsLikesSchema,
    CommentResponseSchema,
    getAllCommentsResponseSchema,
  },
  { $id: "Comment" }
);
