import { Queue } from "bullmq";
import { redisConfig } from "./config/redis_config.ts";

export const sampleQueue = new Queue("sample_queue", {
	connection: redisConfig,
});
