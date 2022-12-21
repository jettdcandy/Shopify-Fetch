window.addEventListener('DOMContentLoaded', shopifyfetch());

function shopifyfetch() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
    //Define variables for current URL, host name & regex to clean the queried URL
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    const current_product = url.href;
    const regex = /\?va[a-zA-Z][a-zA-Z]a[a-zA-Z][a-zA-Z]=([0-9]+)/i;
    const current_product_val = current_product.replace(regex, '');
    const current_product_json = current_product_val + '.json';
    //Use fetch API to query current product JSON data
    const product = fetch(current_product_json);
      product.then((response) => response.json())
      .then((json) => {

        //Display queried data within chrome extension window

        let product_id = json.product.id;
        document.getElementById("product-id").innerHTML = (product_id);

        let product_title = json.product.title;
        document.getElementById("product-name").innerHTML = (product_title);

        //Set href of 'edit product' button to default shopify edit product admin URL with relevant product ID

        document.getElementById('product-admin-link').setAttribute("href", "https://" + domain + "/admin/products/" + product_id );

        //Loop over product tag list & splits to individual list items

        let product_tags = json.product.tags;
        let taglist = product_tags.split(",");
        let taglistlength = taglist.length;
          for (let i = 0; i < taglistlength; i++) {
            let list = document.createElement('li');
            list.innerText=taglist[i];
            document.querySelector('#product-tag-list').appendChild(list);
          }

  })

  });

};