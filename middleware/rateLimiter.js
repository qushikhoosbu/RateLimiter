const clientReq = new Map();

function rateLimiter(windowMs = 1000, maxRequests = 2) {
    return function (req, res, next) {
        const clientIP = req.ip;
        const reqPath = req.path;
        const currentTime = Date.now();
        const key = `${clientIP}:${reqPath}`;

        if (!clientReq.has(key)) {
            clientReq.set(key, []);
        }

        // Get timestamps and filter out old ones
        let timestamps = clientReq.get(key);
        timestamps = timestamps.filter(timestamp => currentTime - timestamp < windowMs);

        if (timestamps.length >= maxRequests) {
            return res.status(429).send('Too many requests');
        }

        // Add current timestamp and update the map
        timestamps.push(currentTime);
        clientReq.set(key, timestamps);

        // Optional: Clean up old keys
        if (clientReq.size > 1000) { // Adjust as needed
            // Cleanup: Remove entries older than 5 minutes
            clientReq.forEach((timestamps, key) => {
                timestamps = timestamps.filter(timestamp => currentTime - timestamp < windowMs * 5);
                if (timestamps.length === 0) {
                    clientReq.delete(key);
                } else {
                    clientReq.set(key, timestamps);
                }
            });
        }

        next();
    };
}

module.exports = rateLimiter;
