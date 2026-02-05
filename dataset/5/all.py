import json
import os
import re

def natural_sort_key(filename):
    """
    Natural sort key function for human-like sorting.
    Sorts numerically where numbers appear in the filename.
    """
    return [int(text) if text.isdigit() else text.lower() 
            for text in re.split(r'(\d+)', filename)]

def combine_json_natural_sorted():
    """Combines all JSON files into all.json with natural sorting"""
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    combined = {}
    
    # Get all JSON files in the script directory
    json_files = []
    for filename in os.listdir(script_dir):
        if filename.endswith('.json') and filename != 'all.json':
            json_files.append(filename)
    
    # Sort the files by name using natural sorting
    json_files.sort(key=natural_sort_key)
    
    # Process files in sorted order
    for filename in json_files:
        try:
            filepath = os.path.join(script_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                combined[filename] = data
                print(f"Added: {filename}")
        except Exception as e:
            print(f"Error reading {filename}: {e}")
    
    # Write combined data to script directory
    output_path = os.path.join(script_dir, 'all.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(combined, f, indent=2, ensure_ascii=False)
    
    print(f"\nCreated {output_path} with {len(combined)} JSON files (naturally sorted)")

if __name__ == "__main__":
    # Choose which version to use:
    # combine_json_simple()  # Regular alphabetical sort
    combine_json_natural_sorted()  # Natural sort (better for numbered files)