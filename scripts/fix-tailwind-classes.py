import os
import re

def replace_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Tailwind class names
    new_content = content.replace('bg-gradient-to-', 'bg-linear-to-')
    new_content = new_content.replace('flex-shrink-0', 'shrink-0')
    new_content = new_content.replace('bg-gradient-to-br', 'bg-linear-to-br')
    new_content = new_content.replace('bg-gradient-to-tr', 'bg-linear-to-tr')
    new_content = new_content.replace('bg-gradient-to-bl', 'bg-linear-to-bl')
    new_content = new_content.replace('bg-gradient-to-tl', 'bg-linear-to-tl')
    new_content = new_content.replace('bg-gradient-to-r', 'bg-linear-to-r')
    new_content = new_content.replace('bg-gradient-to-l', 'bg-linear-to-l')
    new_content = new_content.replace('bg-gradient-to-t', 'bg-linear-to-t')
    new_content = new_content.replace('bg-gradient-to-b', 'bg-linear-to-b')

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    root_dir = r"c:\Users\이경수\OneDrive\바탕 화면\Hankaebom-Star\apps\web\src"
    extensions = ('.tsx', '.ts', '.css')
    count = 0
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(extensions):
                if replace_in_file(os.path.join(root, file)):
                    count += 1
    print(f"Updated {count} files.")

if __name__ == "__main__":
    main()
