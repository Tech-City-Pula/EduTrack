import { z } from 'zod';

const envVariables = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

envVariables.parse(process.env); // Throws an error if any of the required env variables are missing

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {} // This line adds the type of the env variables to the global namespace
	}
}
