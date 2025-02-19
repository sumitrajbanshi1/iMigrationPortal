// Wait for the document to be ready
$(document).ready(function() {
    // Fetch the data from the data.json file
    $.getJSON("data.json", function(data) {
        // Function to render resources based on selected category
        function renderResources(filterCategory = "all") {
            let resourcesHTML = ''; // Initialize an empty string to hold HTML content
            
            // Iterate over all data to generate HTML for each resource
            data.forEach(function(resource) {
                // Check if the resource matches the selected category or "all"
                if (filterCategory === "all" || resource.category === filterCategory) {
                    resourcesHTML += `
                        <div class="resource-card">
                            <h2><a href="${resource.url}" target="_blank">${resource.title}</a></h2>
                            <p>${resource.description}</p>
                            <span class="category">${resource.category}</span>
                        </div>
                    `;
                }
            });

            // Insert the generated HTML into the resources list section
            $('#resources-list').html(resourcesHTML);
        }

        // Initial render with all resources
        renderResources();

        // Event listener for category filter change
        $('#category-filter').change(function() {
            const selectedCategory = $(this).val(); // Get the selected category
            renderResources(selectedCategory); // Render resources based on the selected category
        });
    });
});
