// 1233. Remove Sub-Folders from the Filesystem

/**
Example 1:

Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.
Example 2:

Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".
Example 3:

Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]

*/

const folder = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"];

const removeSubfolders = function (folder: string[]) {
  // Step 1: Sort the folders lexicographically.
  // This ensures parent folders always come before their sub-folders.
  folder.sort();

  // Step 2: Initialize the result array with the first folder.
  const result: string[] = [folder[0]];

  // Step 3: Iterate through the rest of the folders.
  for (let i = 1; i < folder.length; i++) {
    const lastFolder = result[result.length - 1];
    const currentFolder = folder[i];

    // Check if the current folder is a sub-folder of the last added folder.
    // A folder is a sub-folder if it starts with the parent string AND
    // the next character is a '/'.
    // Example: "/a/b" starts with "/a" + "/" -> True (is sub-folder)
    // Example: "/ab" starts with "/a" + "/" -> False (is distinct folder)
    if (!currentFolder.startsWith(lastFolder + "/")) {
      result.push(currentFolder);
    }
  }

  return result;
};

console.log(removeSubfolders(folder));
