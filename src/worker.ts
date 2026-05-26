import { Worker } from "bullmq";
import { redisConfig } from "./config/redis_config.ts";

const sampleWorker = new Worker(
	"sample_queue",
	async (job) => {
		try {
			console.log(`Processing job with id ${job.id} and data:`, job.data);
			//return the processed result or left void if not any
			return job.data;
		} catch (error) {
			console.log(`Error processing job with id ${job.id}:`, error);
		}
	},
	{ connection: redisConfig },
);

sampleWorker.on("completed", (job, result, _prev) => {
	// Business logic to handle job completed successfully
	console.log(`Job with id ${job.id} completed with result:`, result);
});

sampleWorker.on("failed", (job, error, _prev) => {
	// Business logic to handle failed jobs can be added here
	console.log(`Job with id ${job?.id} failed with error:`, error);
});
