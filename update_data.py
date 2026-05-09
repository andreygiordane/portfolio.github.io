import os
import json
import urllib.parse

def generate_js_data(base_path):
    folders = {
        "Logos": "logos",
        "Instagram": "instagram",
        "Eventos": "eventos",
        "Materiais visuais": "materiais"
    }
    
    portfolio_data = []
    
    for folder, category in folders.items():
        folder_path = os.path.join(base_path, folder)
        if not os.path.exists(folder_path):
            continue
            
        for file in os.listdir(folder_path):
            if file.lower().endswith(".webp"):
                title = os.path.splitext(file)[0]
                # Full URL encoding for path
                relative_path = f"{folder}/{file}"
                img_path = f"./{urllib.parse.quote(relative_path)}"
                
                portfolio_data.append({
                    "title": title,
                    "category": category,
                    "img": img_path
                })
    
    # Read existing script.js to preserve the logic
    script_path = os.path.join(base_path, "script.js")
    with open(script_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace the portfolioData array
    start_marker = "const portfolioData = ["
    end_marker = "];"
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker, start_idx) + 2
    
    if start_idx != -1 and end_idx != -1:
        new_data_js = f"const portfolioData = {json.dumps(portfolio_data, indent=4, ensure_ascii=False)};"
        new_content = content[:start_idx] + new_data_js + content[end_idx:]
        
        with open(script_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("script.js updated successfully with all images!")

if __name__ == "__main__":
    base_path = r"c:\Users\Andre\OneDrive\Área de Trabalho\portifólio"
    generate_js_data(base_path)
