//form inputs
var productName = document.getElementById('ProductName');
var productCategory = document.getElementById('ProductCategory');
var productPrice = document.getElementById('ProductPrice');
var productDescription = document.getElementById('ProductDescription');

//search input
var productsSearch = document.getElementById('productsSearch');

//table & search input container
var dataContainer = document.getElementById('dataContainer');

//product table
var productTable = document.getElementById('productTable');

//product table body
var productTableBody = document.getElementById('productTableBody');

//Add product button 
var addProductBtn = document.getElementById('addProductBtn');

//Update product button 
var updateProductBtn = document.getElementById('updateProductBtn');


//Array of Products
var listOfProducts = [];

//Product object
var product = {};

//updated row position
var updatedRow;



var getListFromJson = JSON.parse(localStorage.getItem("dataList"));

if (getListFromJson != null) {
    listOfProducts = getListFromJson;
    hideSearchTable(false);
    displayProduct();
} else {
    listOfProducts = [];
    hideSearchTable(true);
}

function hideSearchTable(state) {
    if (state)
        dataContainer.classList.replace('d-block', 'd-none');
    else
        dataContainer.classList.replace('d-none', 'd-block');

}

function getFormData() {
    if (productName.value != '' && productCategory.value != null
        && productPrice.value != '' && productDescription.value != null) {
        addProduct()
    }
    else {
        productName.classList.add('is-invalid')
        productCategory.classList.add('is-invalid')
        productPrice.classList.add('is-invalid')
        productDescription.classList.add('is-invalid')

    }
}

function addProduct() {
    product = {
        name: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        description: productDescription.value,
    }

    listOfProducts.push(product);

    localStorage.setItem("dataList", JSON.stringify(listOfProducts));

    clearIputs();

    displayProduct()

}

function clearIputs() {
    productName.value = '';
    productCategory.value = '';
    productPrice.value = '';
    productDescription.value = '';

    productName.classList.remove('is-valid', 'is-invalid');
    productCategory.classList.remove('is-valid', 'is-invalid');
    productPrice.classList.remove('is-valid', 'is-invalid');
    productDescription.classList.remove('is-valid', 'is-invalid');

}

function displayProduct() {

    if (listOfProducts.length == 0)
        hideSearchTable(true);
    else
        hideSearchTable(false)


    var tableRow = ``

    for (var i = 0; i < listOfProducts.length; i++) {
        tableRow += `
        <tr>
        <td>${(i + 1)}</td>
        <td>${listOfProducts[i].name}</td>
        <td>${listOfProducts[i].category}</td>
        <td>${listOfProducts[i].price}</td>
        <td>${listOfProducts[i].description}</td>
        <td><a href="#" onclick="deleteProdect(${i});"  class="btn btn-danger text-light">delete</a></td>
        <td><a href="#" onclick="getProductData(${i})" class="btn btn-warning">update</a></td>
        </tr>
        `
    }
    productTable.style.display = ''
    productTableBody.innerHTML = tableRow;

}


function deleteProdect(index) {
    listOfProducts.splice(index, 1)

    localStorage.setItem("dataList", JSON.stringify(listOfProducts));

    displayProduct();
}

function getProductData(index) {
    productName.value = listOfProducts[index].name;
    productCategory.value = listOfProducts[index].category;
    productPrice.value = listOfProducts[index].price;
    productDescription.value = listOfProducts[index].description;

    changeFormButtons('update');

    updatedRow = index;
}

function changeFormButtons(btn) {

    if (btn == 'update') {
        addProductBtn.classList.replace('d-block', 'd-none');
        updateProductBtn.classList.replace('d-none', 'd-block');
    }
    else if (btn == 'add') {
        addProductBtn.classList.replace('d-none', 'd-block');
        updateProductBtn.classList.replace('d-block', 'd-none');
    }

}

function updateProduct() {
    listOfProducts[updatedRow].name = productName.value;
    listOfProducts[updatedRow].category = productCategory.value;
    listOfProducts[updatedRow].price = productPrice.value;
    listOfProducts[updatedRow].description = productDescription.value;

    localStorage.setItem("dataList", JSON.stringify(listOfProducts));

    clearIputs();

    displayProduct();

    changeFormButtons('add');
}


function searchInProducts() {

    var noProductMessage = document.getElementById('noProductMessage');

    var searchedProduct = productsSearch.value;

    var searchedRow = ``;

    for (let i = 0; i < listOfProducts.length; i++) {

        if (listOfProducts[i].name.toLowerCase().includes(searchedProduct.toLowerCase())) {
            searchedRow += `
                <tr>
                <td>${(i + 1)}</td>
                <td>${listOfProducts[i].name.replace(searchedProduct, `<span>${searchedProduct}</span>`)}</td>
                <td>${listOfProducts[i].category}</td>
                <td>${listOfProducts[i].price}</td>
                <td>${listOfProducts[i].description}</td>
                <td><a href="#" onclick="deleteProdect(${i});"  class="btn btn-danger text-light">delete</a></td>
                <td><a href="#" onclick="getProductData(${i})" class="btn btn-warning">update</a></td>
                </tr>`


        }


    }

    if (searchedRow == ``) {
        productTable.style.display = 'none'
        noProductMessage.classList.replace('d-none', 'd-block');

    } else {
        productTableBody.innerHTML = searchedRow;
        productTable.style.display = ''
        noProductMessage.classList.replace('d-block', 'd-none');
    }

}


//invalid messages
var ProductNameInvalid = document.getElementById('ProductNameInvalid');
var ProductCategoryInvalid = document.getElementById('ProductCategoryInvalid');
var ProductPriceInvalid = document.getElementById('ProductPriceInvalid');
var ProductDescriptionInvalid = document.getElementById('ProductDescriptionInvalid');

function validateProductName(name) {
    var productNamePattern = /[A-Z][a-z]{3,}[ ]?([A-Za-z]{1,})?[ ]?([1-9]{1,4})?[ ]?([A-Za-z]{1,})?$/;

    if (name == '') {
        ProductNameInvalid.style.display = 'none'
        productName.classList.remove('is-valid', 'is-invalid');
    } else {
        if (productNamePattern.test(name)) {
            productName.classList.replace('is-invalid', 'is-valid');
            ProductNameInvalid.style.display = 'none'
        } else {
            ProductNameInvalid.textContent = 'Product name is invalid'
            ProductNameInvalid.style.display = 'block'
            productName.classList.add('is-invalid', 'is-valid')
        }
    }
}

function validateProductCategory(category) {
    var productCategoryPattern = /^[A-Z][a-z]{3,}$/;

    if (category == '') {
        ProductCategoryInvalid.style.display = 'none'
        productCategory.classList.remove('is-valid', 'is-invalid');
    } else {
        if (productCategoryPattern.test(category)) {
            productCategory.classList.replace('is-invalid', 'is-valid');
            ProductCategoryInvalid.style.display = 'none'
        } else {
            productCategory.classList.add('is-invalid', 'is-valid')
            ProductCategoryInvalid.textContent = 'Product category is invalid'
            ProductCategoryInvalid.style.display = 'block'
        }
    }
}

function validateProductPrice(price) {
    var productPricePattern = /^[1-9][0-9]{1,6}$/;

    if (price == '') {
        ProductPriceInvalid.style.display = 'none'
        productPrice.classList.remove('is-valid', 'is-invalid');
    } else {
        if (productPricePattern.test(price)) {
            productPrice.classList.replace('is-invalid', 'is-valid');
            ProductPriceInvalid.style.display = 'none'
        } else {
            productPrice.classList.add('is-invalid', 'is-valid')
            ProductPriceInvalid.textContent = 'Product Price is invalid'
            ProductPriceInvalid.style.display = 'block'
        }
    }
}

function validateProductDescription(description) {

    var productDescriptionPattern = /[A-Za-z 0-9]{5,}[ ]?[\n]?[.]?/;

    if (description == '') {
        ProductDescriptionInvalid.style.display = 'none'
        productDescription.classList.remove('is-valid', 'is-invalid')
    } else {
        if (productDescriptionPattern.test(description)) {
            productDescription.classList.replace('is-invalid', 'is-valid')
            ProductDescriptionInvalid.style.display = 'none'
        } else {
            ProductDescriptionInvalid.textContent = 'Product Description is invalid'
            ProductDescriptionInvalid.style.display = 'block'
            productDescription.classList.add('is-invalid', 'is-valid')
        }
    }

}







