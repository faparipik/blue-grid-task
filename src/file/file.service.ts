import { Files } from "./file.dto";

interface TreeNode {
  [key: string]: TreeNode | string[];
}

interface InputFormat {
  [key: string]: any;
}

interface OutputFormat {
  [key: string]: any[];
}

function parseUrl(url: string): { hostname: string; pathParts: string[] } {
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  // we use filter to remove empthy string
  const pathParts = urlObj.pathname.split("/").filter((part) => part);

  return { hostname, pathParts };
}

function addToTree(tree: TreeNode, pathParts: string[]): void {
  let currentNode = tree;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (!currentNode[part]) {
      currentNode[part] = {};
    }
    currentNode = currentNode[part] as TreeNode;
  }
  const lastPart = pathParts[pathParts.length - 1];

  if (!currentNode["files"]) {
    currentNode["files"] = [];
  }
  (currentNode["files"] as string[]).push(lastPart);
}

const formatTree = (input: InputFormat): OutputFormat => {
  let output: OutputFormat = {};

  for (const [key, value] of Object.entries(input)) {
    if (value.files) {
      const { files, ...rest } = value;

      output[key] = files;

      if (!Array.isArray(rest) && Object.keys(rest).length) {
        const treeOutput = formatTree(rest);
        const reverseTree = Object.entries(treeOutput).map(([k, v]) => ({
          [k]: v,
        }));
        output[key] = [...reverseTree, ...output[key]];
      }
    } else {
      const treeOutput = formatTree(value);
      const reverseTree = Object.entries(treeOutput).map(([k, v]) => ({
        [k]: v,
      }));
      output[key] = [...reverseTree];
    }
  }

  return output;
};

function buildTree(urls: Array<{ fileUrl: string }>): TreeNode {
  const tree: TreeNode = {};
  urls.forEach(({ fileUrl }) => {
    const { hostname, pathParts } = parseUrl(fileUrl);
    if (!tree[hostname]) {
      tree[hostname] = {};
    }
    addToTree(tree[hostname] as TreeNode, pathParts);
  });
  return tree;
}

const formatFileInTreeStructure = (files: Files) => {
  const tree = buildTree(files.items);
  return formatTree(tree);
};

export { formatFileInTreeStructure };
