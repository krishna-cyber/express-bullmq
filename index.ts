import express, { type Request, type Response } from "express";
import { sampleQueue } from "./src/queue.ts";
//run the workers
import "./src/worker.ts";

const app = express();

// disable server fingerprint
app.disable("x-powered-by");

app.get("/example", async (_req: Request, res: Response) => {
	try {
		const job = await sampleQueue.add(
			"example_job",
			{
				exampleData: "This is an example job",
			},
			{
				attempts: 3, //retry the job up to 3 times if it fails
				backoff: {
					type: "exponential",
					delay: 1000, //initial delay of 1 second before retrying
				},
			},
		);
		console.log(`Job with id ${job.id} added to the queue successfully`);
		res
			.status(200)
			.json({ message: `Job added to the queue successfully ${job.id}` });
	} catch (error) {
		console.error("Error adding job to the queue:", error);
		res.status(500).json({ message: "Failed to add job to the queue" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
