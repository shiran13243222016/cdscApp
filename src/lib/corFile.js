import P from 'bluebird'

let resolveLocalFilesystemUrl = (fileUrl)=> {
  return new P((resolve, reject) => {
    try {
      window.resolveLocalFileSystemURL(
        fileUrl,
        (entry) => {
          resolve(entry);
        },
        err => {
          reject(err);
        }
      );
    } catch (xc) {
      reject(xc);
    }
  });
}

let resolveDirectoryUrl = (directoryUrl)=> {
  return resolveLocalFilesystemUrl(directoryUrl).then(de => {
    if (de.isDirectory) {
      return P.resolve(de);
    } else {
      return P.reject(Error('input is not a directory'));
    }
  });
}
/**
 * Get a directory
 * @param directoryEntry {DirectoryEntry} Directory entry, obtained by resolveDirectoryUrl method
 * @param directoryName {string} Directory name
 * @param flags {Flags} Options
 * @returns {Promise<DirectoryEntry>}
 */

let getDirectory = (directoryEntry, directoryName,flags)=> {
  return new P((resolve, reject) => {
    try {
      directoryEntry.getDirectory(
        directoryName,
        flags,
        de => {
          resolve(de);
        },
        err => {
          reject(err);
        }
      );
    } catch (xc) {
      reject(xc);
    }
  });
}

let readFile = (path,file,readAs)=> {//'ArrayBuffer' | 'BinaryString' | 'DataURL' | 'Text'
  if (/^\//.test(file)) {
    return P.reject(new Error('file-name cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then((directoryEntry) => {
      return getFile(directoryEntry, file, { create: false });
    })
    .then((fileEntry) => {
      const reader = new FileReader();
      return new P((resolve, reject) => {
        reader.onloadend = () => {
          if (reader.result !== undefined || reader.result !== null) {
            resolve(reader.result);
          } else if (reader.error !== undefined || reader.error !== null) {
            reject(reader.error);
          } else {
            reject({ code: null, message: 'READER_ONLOADEND_ERR' });
          }
        };

        fileEntry.file(
          file => {
            reader[`readAs${readAs}`].call(reader, file);
          },
          error => {
            reject(error);
          }
        );
      });
    });
}

let write = (writer,gu)=> {
  if (gu instanceof Blob) {
    return writeFileInChunks(writer, gu);
  }

  return new P((resolve, reject) => {
    writer.onwriteend = (evt) => {
      if (writer.error) {
        reject(writer.error);
      } else {
        resolve(evt);
      }
    };
    writer.write(gu);
  });
}

/**
 * @hidden
 */
let writeFileInChunks = (writer, file)=> {
  const BLOCK_SIZE = 1024 * 1024;
  let writtenSize = 0;

  function writeNextChunk() {
    const size = Math.min(BLOCK_SIZE, file.size - writtenSize);
    const chunk = file.slice(writtenSize, writtenSize + size);

    writtenSize += size;
    writer.write(chunk);
  }

  return new P((resolve, reject) => {
    writer.onerror = reject;
    writer.onwrite = () => {
      if (writtenSize < file.size) {
        writeNextChunk();
      } else {
        resolve();
      }
    };
    writeNextChunk();
  });
}

let remove = (fe)=> {
  return new P((resolve, reject) => {
    fe.remove(
      () => {
        resolve({ success: true, fileRemoved: fe });
      },
      err => {
        reject(err);
      }
    );
  });
}

let move = (srce,destdir,newName)=>{
  return new P((resolve, reject) => {
    srce.moveTo(
      destdir,
      newName,
      resolve,
      reject
    );
  });
}

/**
 * @hidden
 */
let copy = (srce,destdir,newName)=> {
  return new P((resolve, reject) => {
    srce.copyTo(
      destdir,
      newName,
      resolve,
      reject
    );
  });
}

let rimraf = (de)=> {
  return new P((resolve, reject) => {
    de.removeRecursively(
      () => {
        resolve({ success: true, fileRemoved: de });
      },
      reject
    );
  });
}

let createWriter = (fe)=> {
  return new P((resolve, reject) => {
    fe.createWriter(
      resolve,
      reject
    );
  });
}

/**
 * Check if a directory exists in a certain path, directory.
 *
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} dir Name of directory to check
 * @returns {Promise<boolean>} Returns a Promise that resolves to true if the directory exists or rejects with an
 *   error.
 */
let checkDir = (path, dir)=> {
    if (/^\//.test(dir)) {
      return P.reject(new Error('directory cannot start with /'));
    }

    const fullPath = path + dir;
    return resolveDirectoryUrl(fullPath).then(() => {
        return P.resolve(true);
    });
}

/**
 * Creates a new directory in the specific path.
 * The replace boolean value determines whether to replace an existing directory with the same name.
 * If an existing directory exists and the replace value is false, the promise will fail and return an error.
 *
 * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} dirName Name of directory to create
 * @param {boolean} replace If true, replaces file with same name. If false returns error
 * @returns {Promise<DirectoryEntry>} Returns a Promise that resolves with a DirectoryEntry or rejects with an error.
 */
let createDir = (path,dirName,replace)=> {
  if (/^\//.test(dirName)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  const options= {
    create: true
  };

  if (!replace) {
    options.exclusive = true;
  }

  return resolveDirectoryUrl(path).then(fse => {
    return getDirectory(fse, dirName, options);
  });
}


/**
 * Remove a directory at a given path.
 *
 * @param {string} path The path to the directory
 * @param {string} dirName The directory name
 * @returns {Promise<RemoveResult>} Returns a Promise that resolves to a RemoveResult or rejects with an error.
 */
let removeDir = (path, dirName)=>{
  if (/^\//.test(dirName)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then(fse => {
      return getDirectory(fse, dirName, { create: false });
    })
    .then(de => {
      return remove(de);
    });
}

/**
 * Move a directory to a given path.
 *
 * @param {string} path The source path to the directory
 * @param {string} dirName The source directory name
 * @param {string} newPath The destination path to the directory
 * @param {string} newDirName The destination directory name
 * @returns {Promise<DirectoryEntry|Entry>} Returns a Promise that resolves to the new DirectoryEntry object or
 *   rejects with an error.
 */
let moveDir = (path,dirName,newPath,newDirName)=> {
  newDirName = newDirName || dirName;

  if (/^\//.test(newDirName)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then(fse => {
      return getDirectory(fse, dirName, { create: false });
    })
    .then(srcde => {
      return resolveDirectoryUrl(newPath).then(destenation => {
        return move(srcde, destenation, newDirName);
      });
    });
}

/**
 * Copy a directory in various methods. If destination directory exists, will fail to copy.
 *
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystems above
 * @param {string} dirName Name of directory to copy
 * @param {string} newPath Base FileSystem of new location
 * @param {string} newDirName New name of directory to copy to (leave blank to remain the same)
 * @returns {Promise<Entry>} Returns a Promise that resolves to the new Entry object or rejects with an error.
 */
let copyDir = (path,dirName,newPath,newDirName) => {
  if (/^\//.test(newDirName)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then(fse => {
      return getDirectory(fse, dirName, { create: false });
    })
    .then(srcde => {
      return resolveDirectoryUrl(newPath).then(deste => {
        return copy(srcde, deste, newDirName);
      });
    });
}

/**
 * Check if a file exists in a certain path, directory.
 *
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} file Name of file to check
 * @returns {Promise<boolean>} Returns a Promise that resolves with a boolean or rejects with an error.
 */
let checkFile = (path, file) => {
  if (/^\//.test(file)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  return resolveLocalFilesystemUrl(path + file).then(fse => {
    if (fse.isFile) {
      return P.resolve(true);
    } else {
      return P.reject(new Error( 'input is not a file'));
    }
  });
}

/**
 * Creates a new file in the specific path.
 * The replace boolean value determines whether to replace an existing file with the same name.
 * If an existing file exists and the replace value is false, the promise will fail and return an error.
 *
 * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} fileName Name of file to create
 * @param {boolean} replace If true, replaces file with same name. If false returns error
 * @returns {Promise<FileEntry>} Returns a Promise that resolves to a FileEntry or rejects with an error.
 */
let createFile = (path,fileName,replace)=>{
  if (/^\//.test(fileName)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  const options = {
    create: true
  };

  if (!replace) {
    options.exclusive = true;
  }

  return resolveDirectoryUrl(path).then(fse => {
    return getFile(fse, fileName, options);
  });
}
/**
 * Get a file
 * @param directoryEntry {DirectoryEntry} Directory entry, obtained by resolveDirectoryUrl method
 * @param fileName {string} File name
 * @param flags {Flags} Options
 * @returns {Promise<FileEntry>}
 */
let getFile = (directoryEntry,fileName,flags)=> {
  return new P((resolve, reject) => {
    try {
      directoryEntry.getFile(fileName, flags, resolve, reject);
    } catch (xc) {
      reject(xc);
    }
  });
}

/**
 * Removes a file from a desired location
 *
 * @param {string} path  Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} fileName Name of file to remove
 * @returns {Promise<RemoveResult>} Returns a Promise that resolves to a RemoveResult or rejects with an error.
 */
let removeFile = (path,fileName) => {
  if (/^\//.test(fileName)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then(fse => {
      return getFile(fse, fileName, { create: false });
    })
    .then(fe => {
      return remove(fe);
    });
}

/**
 * Removes all files and the directory from a desired location.
 *
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} dirName Name of directory
 * @returns {Promise<RemoveResult>} Returns a Promise that resolves with a RemoveResult or rejects with an error.
 */
let removeRecursively = (path, dirName)=>{
  if (/^\//.test(dirName)) {
    return P.reject(new Error('directory cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then(fse => {
      return getDirectory(fse, dirName, { create: false });
    })
    .then(de => {
      return rimraf(de);
    });
}

/**
 * Write a new file to the desired location.
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} fileName path relative to base path
 * @param {string | Blob | ArrayBuffer} text content, blob or ArrayBuffer to write
 * @param {IWriteOptions} whether to replace/append to an existing file. See IWriteOptions for more information.
 * @returns {Promise<any>} Returns a Promise that resolves to updated file entry or rejects with an error.
 */
let writeFile = (path,fileName,text,options = {})=> {
  if (/^\//.test(fileName)) {
    return P.reject(new Error('file-name cannot start with /'));
  }

  const getFileOpts = {
    create: !options.append,
    exclusive: !options.replace
  };

  return resolveDirectoryUrl(path)
    .then((directoryEntry) => {
      return getFile(directoryEntry, fileName, getFileOpts);
    })
    .then((fileEntry) => {
      return writeFileEntry(fileEntry, text, options);
    });
}

/**
 * Write content to FileEntry.
 * @hidden
 * Write to an existing file.
 * @param {FileEntry} fe file entry object
 * @param {string | Blob | ArrayBuffer} text text content or blob to write
 * @param {IWriteOptions} options replace file if set to true. See WriteOptions for more information.
 * @returns {Promise<FileEntry>}  Returns a Promise that resolves to updated file entry or rejects with an error.
 */
let writeFileEntry = (fe,text,options) => {
  return createWriter(fe)
    .then(writer => {
      if (options.append) {
        writer.seek(writer.length);
      }

      if (options.truncate) {
        writer.truncate(options.truncate);
      }

      return write(writer, text);
    })
    .then(() => fe);
}

/**
 * Write to an existing file.
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} fileName path relative to base path
 * @param {string | Blob} text content or blob to write
 * @returns {Promise<void>} Returns a Promise that resolves or rejects with an error.
 */
let writeExistingFile = (path,fileName,text) => {
  return writeFile(path, fileName, text, { replace: true });
}
/**
 * Read the contents of a file as text.
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} file Name of file, relative to path.
 * @returns {Promise<string>} Returns a Promise that resolves with the contents of the file as string or rejects with
 *   an error.
 */
let readAsText = (path, file)=>{
  return readFile(path, file, 'Text');
}

/**
 * Move a file to a given path.
 *
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} fileName Name of file to move
 * @param {string} newPath Base FileSystem of new location
 * @param {string} newFileName New name of file to move to (leave blank to remain the same)
 * @returns {Promise<Entry>} Returns a Promise that resolves to the new Entry or rejects with an error.
 */
let moveFile = (path,fileName,newPath,newFileName)=>{
  newFileName = newFileName || fileName;

  if (/^\//.test(newFileName)) {
    return P.reject(new Error('file-name cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then(fse => {
      return getFile(fse, fileName, { create: false });
    })
    .then(srcfe => {
      return resolveDirectoryUrl(newPath).then(deste => {
        return move(srcfe, deste, newFileName);
      });
    });
}

/**
 * Copy a file in various methods. If file exists, will fail to copy.
 *
 * @param {string} path Base FileSystem. Please refer to the iOS and Android filesystem above
 * @param {string} fileName Name of file to copy
 * @param {string} newPath Base FileSystem of new location
 * @param {string} newFileName New name of file to copy to (leave blank to remain the same)
 * @returns {Promise<Entry>} Returns a Promise that resolves to an Entry or rejects with an error.
 */
let copyFile = (path,fileName,newPath,newFileName)=> {
  newFileName = newFileName || fileName;

  if (/^\//.test(newFileName)) {
    return P.reject(new Error('file-name cannot start with /'));
  }

  return resolveDirectoryUrl(path)
    .then(fse => {
      return getFile(fse, fileName, { create: false });
    })
    .then(srcfe => {
      return resolveDirectoryUrl(newPath).then(deste => {
        return copy(srcfe, deste, newFileName);
      });
    });
}


/*
let getFileEntry = (path)=> {

  return new P((resolve, reject) => {
    window.resolveLocalFileSystemURL(path, function (file) {

      resolve(file)

    }, reject);
  })

}

let getDirEntry = (dir)=> {

  return new P((resolve, reject) => {
    window.resolveLocalFileSystemURL(dir, function (dirEntry) {

      resolve(dirEntry)

    }, reject);
  })

}

let write = (fileEntry, dataObj)=>{
  // Create a FileWriter object for our FileEntry (log.txt).

  return new P((resolve,reject)=>{
    fileEntry.createWriter((fileWriter)=> {

      fileWriter.onwriteend = ()=> {
        console.log("Successful file write...");
        resolve(fileEntry);
      };

      fileWriter.onerror = reject;

      // If data object is not passed in,
      // create a new Blob instead.
      fileWriter.write(dataObj);
    });
  })

}

let read = (fileEntry) => {

  return new P((resolve,reject)=>{
    fileEntry.file((file) => {
      let reader = new FileReader();

      reader.onloadend = function() {
        resolve(reader.result);
      };

      reader.readAsText(file);

    }, reject);
  })

};

const readFile = (path)=>{
  return getFileEntry(path).then((fileEntry)=>{
      return read(fileEntry);
  }).catch(()=>{
      return "";
  })
};

const writeFile = (dir,file,data)=>{
  return getDirEntry(dir).then((dirEntry)=>{
    return new P((resolve,reject)=>{
        dirEntry.getFile(file, { create: true, exclusive: false },resolve,reject)
    })
  }).then((fileEntry)=>{
      return write(fileEntry,data)
  })

};
*/
export default {
  getDirectory,
  readFile,
  writeFile,
  copyFile,
  checkDir,
  createDir,
  moveFile,
  readAsText,
  writeExistingFile,
  writeFileEntry ,
  removeRecursively ,
  removeFile ,
  createFile ,
  checkFile ,
  copyDir ,
  moveDir ,
  removeDir,
	getFile,
	resolveDirectoryUrl
}

