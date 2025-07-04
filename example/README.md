# Managing Categories in index.html

This project uses a single-file approach. All categories are defined directly in `index.html`.

## How to Add a Category
1. **Duplicate a Section:**
   - Find the `<section class="product-section" id="...">...</section>` block for an existing category.
   - Copy and paste it below the last category section.
2. **Edit the Section:**
   - Change the `id` attribute to a unique value (e.g., `id="new-category"`).
   - Update the `<h2>`, `<p>`, and image URLs/alt texts as needed.
3. **Add a Navigation Arrow:**
   - In the `<div class="arrows-nav">` block, duplicate one of the `<div class="arrow-label-group">...</div>` elements.
   - Update the `onclick` to scroll to your new section's id (e.g., `onclick="document.getElementById('new-category').scrollIntoView({behavior: 'smooth'});"`).
   - Change the label text to match your new category.

## How to Remove a Category
1. **Delete the Section:**
   - Remove the entire `<section class="product-section" id="...">...</section>` block for the category you want to remove.
2. **Remove the Navigation Arrow:**
   - Delete the corresponding `<div class="arrow-label-group">...</div>` from the `<div class="arrows-nav">` block.

## How to Edit a Category
- Edit the relevant `<section class="product-section" id="...">...</section>` block:
  - Change the title (`<h2>`), description (`<p>`), or images as needed.
- Update the navigation arrow label if you change the category name.

## Notes
- All changes are made directly in `index.html`.
- Each category section must have a unique `id`.
- The navigation arrow's `onclick` must match the section's `id`.
- Images can be external URLs or local files in the project directory. 