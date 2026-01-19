const { execSync } = require('child_process');

try {
  console.log("🔍 Fetching latest build ID...");
  // Get the latest build ID (limit 1)
  const buildId = execSync('gcloud builds list --limit=1 --format="value(id)"').toString().trim();

  if (!buildId) {
    console.error("❌ No builds found.");
    process.exit(1);
  }

  console.log(`📋 Found Build ID: ${buildId}`);
  console.log("⏳ Retrieving logs (this may take a moment)...");

  // Fetch the logs
  const logs = execSync(`gcloud builds log ${buildId}`).toString();
  console.log("\n--- BUILD LOGS START ---\n");
  console.log(logs);
  console.log("\n--- BUILD LOGS END ---\n");

} catch (error) {
  console.error("❌ Error retrieving logs:", error.message);
}
