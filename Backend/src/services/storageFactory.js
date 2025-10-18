const AmazonRepository = require("./AWS/awsRepository");
//const OracleRepository = require("./OCI/oracleRepository");
//const GoogleRepository = require("./GCP/gcpRepository");
//const AzureRepository = require("./AZ/azureRepository");

class StorageFactory {
    static create(provider, bucketName) {
        switch (provider.toLowerCase()) {
            case 'aws': return new AmazonRepository(bucketName);
            //case 'oci': return new OracleRepository();
            //case 'gcp': return new GoogleRepository();
            //case 'azure': return new AzureRepository();
            default:
                throw new Error(`Proveedor no soportado o no existente: ${provider}`);
        }
    }
}

module.exports = StorageFactory;
