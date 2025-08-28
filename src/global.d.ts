declare module "*.yaml" {
  interface YamlContent {
    facts: Record<string, {
      prompt: string;
      response: string;
      related: string[];
      mnemonic: string;
    }>;
  }
  const content: YamlContent;
  export default content;
}
