import Butter from "./lib/butter";

async function testing (apiToken: string) {
  const butter = new Butter(apiToken)
  const data = await butter.post.list({page: 1, page_size: 1})
  console.log(data.data[0].title)
}

testing('b60a008584313ed21803780bc9208557b3b49fbb')