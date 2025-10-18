const { S3Client } = require('@aws-sdk/client-s3');
const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');

class AmazonClient {
    constructor(region = process.env.AWS_REGION) {
        this.region = region;
        this.client = null;
    }

    async initialize() {
        try {
            // Si no se definió región, el SDK intentará detectarla automáticamente
            this.client = new S3Client({ region: this.region || undefined });

            // Validar credenciales probando STS
            const sts = new STSClient({ region: this.region || undefined });
            const identity = await sts.send(new GetCallerIdentityCommand({}));

            console.log(`✅ AWS credentials loaded for account ${identity.Account}, user ${identity.Arn}`);
            console.log(`🌎 Región activa: ${this.region || '(detectada automáticamente)'}`);
            return true;
        } catch (err) {
            console.warn('⚠️ AWS client initialization failed:', err.message);
            this.client = null;
            return false;
        }
    }

    getClient() {
        if (!this.client) throw new Error('AWS S3 client not initialized or unavailable.');
        return this.client;
    }

    isAvailable() {
        return this.client !== null;
    }
}

module.exports = AmazonClient;
