class IStorageRepository {
  async upload(filePath, fileName) {
    throw new Error("Se debe implemetar el método upload()");
  }

  async listObjects() {
    throw new Error("Se debe implemetar el método listObjects()");
  }

  async downloadObject(fileName, destinationPath){
    throw new Error("Se debe implemetar el método downloadObject()");
  }

  async deleteObject(fileName){
    throw new Error("Se debe implemetar el método deleteObject()");
  }
  
  async createFolder(folderName) {
    throw new Error("Se debe implementar el método createFolder()");
  }
}

module.exports = IStorageRepository;