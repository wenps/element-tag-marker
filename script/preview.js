/*
 * @Date: 2025-02-06 16:17:07
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-05 19:01:14
 * @FilePath: /element-tag-marker/script/preview.js
 */
// @ts-check
import shell from "shelljs"; // 使用 import 引入 shelljs 模块
import { select } from "@inquirer/prompts"; // 使用 import 引入 select 函数
import fs from "fs"; // 使用 import 引入 fs 模块
import util from "util"; // 使用 import 引入 util 模块

// 解析命令行参数并将其存储在 Map 中
const parseArgsToMap = () => {
  const args = new Map();

  // 遍历命令行参数，将每个参数按 '=' 分割并存入 Map
  process.argv.forEach((arg) => {
    const [key, value] = arg.split("=");
    args.set(key, value);
  });
  return args;
};

// 解析命令行参数
const argMap = parseArgsToMap();

const run = async () => {
  const readdir = util.promisify(fs.readdir);
  // 读取文件夹内容
  const files = await readdir("example", { withFileTypes: true });
  // 过滤出文件夹
  const choices = files
    .filter((file) => file.isDirectory())
    .map((folder) => {
      return {
        name: folder.name,
        value: folder.name,
      };
    });

  let example;
  // 自带指令 p 标识指定插件类型
  if (argMap.has("p")) {
    // 如果指定了插件类型，则从 choices 中查找对应的值
    example = choices.find((choice) => choice.name === argMap.get("p"))?.value;
  }

  if (!example) {
    example = await select({
      message: "please select preview example ——",
      choices: choices,
      default: choices[0].value,
    });
  }

  shell.cd(`example/${example}`);
  shell.exec("pnpm run dev");
};

run();
