import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { parcelRouter } from "./parcel";
import { branchRouter } from "./branch";


export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  parcel: parcelRouter,
  branch: branchRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
