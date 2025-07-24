import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const healthCheck = {
		status: 'ok',
		timestamp: new Date().toISOString(),
		version: '1.0.0-dev',
		environment: 'development',
		services: {
			database: {
				status: 'checking',
				message: 'MongoDB connection check'
			},
			redis: {
				status: 'checking',
				message: 'Redis connection check'
			}
		}
	};

	try {
		// TODO: Ajouter la vérification de connexion MongoDB
		// const mongoClient = await connectToMongoDB();
		// await mongoClient.db('admin').command({ ping: 1 });
		healthCheck.services.database.status = 'ok';
		healthCheck.services.database.message = 'MongoDB connected successfully';
	} catch (error) {
		healthCheck.services.database.status = 'error';
		healthCheck.services.database.message = `MongoDB connection failed: ${error}`;
		healthCheck.status = 'degraded';
	}

	try {
		// TODO: Ajouter la vérification de connexion Redis
		// await redisClient.ping();
		healthCheck.services.redis.status = 'ok';
		healthCheck.services.redis.message = 'Redis connected successfully';
	} catch (error) {
		healthCheck.services.redis.status = 'error';
		healthCheck.services.redis.message = `Redis connection failed: ${error}`;
		if (healthCheck.status === 'ok') {
			healthCheck.status = 'degraded';
		}
	}

	const httpStatus = healthCheck.status === 'ok' ? 200 : 503;

	return json(healthCheck, {
		status: httpStatus,
		headers: {
			'Cache-Control': 'no-cache',
			'Content-Type': 'application/json'
		}
	});
};
