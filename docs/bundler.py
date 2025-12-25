import os
import base64

def get_base64_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

def bundle_project():
    base_dir = r"C:\Users\SrRomer0\.gemini\antigravity\scratch\carta_navidad_amor"
    
    with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
        html_content = f.read()

    with open(os.path.join(base_dir, "style.css"), "r", encoding="utf-8") as f:
        css_content = f.read()

    with open(os.path.join(base_dir, "script.js"), "r", encoding="utf-8") as f:
        js_content = f.read()

    # Images to embed
    # Note: assets/fondo.jpg is in style.css, others in index.html
    images = {
        "assets/tree.png": "image/png",
        "assets/snowman.png": "image/png",
        "assets/fondo.jpg": "image/jpeg"
    }

    # Embed images into content
    for path, mime in images.items():
        full_path = os.path.join(base_dir, path)
        if os.path.exists(full_path):
            b64 = get_base64_image(full_path)
            data_uri = f"data:{mime};base64,{b64}"
            
            # Replace in HTML
            html_content = html_content.replace(path, data_uri)
            
            # Replace in CSS (for background images)
            css_content = css_content.replace(path, data_uri)
            
        else:
            print(f"Warning: Could not find {path}")

    # Inject CSS (now with embedded images) into HTML
    html_content = html_content.replace('<link rel="stylesheet" href="style.css">', f'<style>{css_content}</style>')
    
    # Inject JS into HTML
    html_content = html_content.replace('<script src="script.js"></script>', f'<script>{js_content}</script>')

    output_path = os.path.join(base_dir, "carta_para_enviar.html")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"Successfully created {output_path}")

if __name__ == "__main__":
    bundle_project()
