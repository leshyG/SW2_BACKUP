const IStorageRepository = require('../IStorageRepository');
const AmazonClient = require('./awsClient');
const {
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

class AWSRepository extends IStorageRepository {
  constructor(bucketName) {
    super();
    if (!bucketName) throw new Error("Se requiere el nombre del bucket para operar con AWS!");
    this.clientWrapper = new AmazonClient();
    this.bucketName = bucketName;
    this.client = null;
  }

  async init() {
    const ready = await this.clientWrapper.initialize();
    if (!ready) throw new Error('Cliente de AWS no inicializado o credenciales inválidas.');
    this.client = this.clientWrapper.getClient();
  }

  async upload(filePath, fileName) {
    const fileStream = fs.createReadStream(filePath);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
      Body: fileStream,
    });

    await this.client.send(command);
    console.log(`Archivo: "${fileName}" subido al bucket:  ${this.bucketName}`);
  }

  async listObjects() {
    const command = new ListObjectsV2Command({ Bucket: this.bucketName });
    const result = await this.client.send(command);
    return result.Contents || [];
  }

  async downloadObject(fileName, destinationPath) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    const { Body } = await this.client.send(command);
    
    const destDir = path.dirname(destinationPath);
    fs.mkdirSync(destDir, { recursive: true });
    const dest = fs.createWriteStream(destinationPath);

    await new Promise((resolve, reject) => {
      Body.pipe(dest);
      Body.on('end', resolve);
      Body.on('error', reject);
    });
    console.log(`Archivo: "${fileName}" descargado en: ${destinationPath}`);
  }

  async deleteObject(fileName) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName,
    });

    await this.client.send(command);
    console.log(`Archivo: "${fileName}" eliminado de: ${this.bucketName}`);
  }

  async createFolder(folderName) {
    if (!folderName.endsWith('/')) folderName += '/';
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: folderName,
      Body: '',
    });

    await this.client.send(command);
    console.log(`Carpeta: "${folderName}" creada en: ${this.bucketName}`);
  }
}

module.exports = AWSRepository;
