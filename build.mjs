import react from "@vitejs/plugin-react-swc";
import { execSync } from "child_process";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";

config();

const __dirname = fileURLToPath(new URL(".", import.meta.url));

await build({
  root: path.resolve(__dirname, "./vite"),
  base: "/CodeWrapped/",
  plugins: [react()],
  publicDir: path.resolve(__dirname, "./vite/public"),  // Changed to vite/public
});

// Skip TypeScript check for GitHub Pages deployment
// Uncomment the line below if you want to run TypeScript check locally
// await execSync("npx tsc -p tsconfig.node.json", {
//   stdio: "inherit",
// });
