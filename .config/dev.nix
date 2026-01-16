{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    # Node.js & Package Managers
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.nodePackages.pnpm

    # Python
    pkgs.python311
    pkgs.python311Packages.pip

    # Google Cloud SDK
    pkgs.google-cloud-sdk

    # Database Tools
    pkgs.postgresql_15

    # Version Control
    pkgs.git

    # Utilities
    pkgs.jq
    pkgs.ripgrep
    pkgs.fd
  ];

  shellHook = ''
    echo "🚀 Google Antigravity Agent Environment Loaded"
    echo "================================================"
    echo ""
    echo "📋 Quick Reference:"
    echo "  - Rules:     .agent/rules/"
    echo "  - Skills:    .agent/skills/"
    echo "  - Workflows: .agent/workflows/"
    echo "  - Context:   .context/"
    echo ""
    echo "⚠️  Review .agent/rules/global.md before starting."
    echo ""

    # Set project defaults
    export PROJECT_ROOT=$(pwd)
    export NODE_ENV=development
  '';
}
