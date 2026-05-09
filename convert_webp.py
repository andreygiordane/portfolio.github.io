import os
from PIL import Image
Image.MAX_IMAGE_PIXELS = None

def convert_images(root_dir):
    extensions = ('.png', '.jpg', '.jpeg')
    for subdir, dirs, files in os.walk(root_dir):
        # Skip .git directory
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            if file.lower().endswith(extensions):
                input_path = os.path.join(subdir, file)
                output_path = os.path.splitext(input_path)[0] + '.webp'
                
                try:
                    with Image.open(input_path) as img:
                        # WebP has a maximum dimension of 16383 pixels
                        max_dim = 16383
                        if img.width > max_dim or img.height > max_dim:
                            ratio = min(max_dim / img.width, max_dim / img.height)
                            new_size = (int(img.width * ratio), int(img.height * ratio))
                            img = img.resize(new_size, Image.Resampling.LANCZOS)
                            print(f"Resized: {input_path} to {new_size}")

                        # Optimization: Reduce quality for the huge Instagram file
                        quality = 80
                        if 'Instagram' in subdir and file == 'Instagram.png':
                            quality = 60
                        
                        img.save(output_path, 'webp', quality=quality)
                        print(f"Converted: {input_path} -> {output_path}")
                        
                        # Delete original file
                        os.remove(input_path)
                except Exception as e:
                    print(f"Error converting {input_path}: {e}")

if __name__ == "__main__":
    base_path = r"c:\Users\Andre\OneDrive\Área de Trabalho\portifólio"
    convert_images(base_path)
