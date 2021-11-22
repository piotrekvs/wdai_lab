const products = {};
const prodMenuList = document.getElementById('prod-menu-list');
const selectedProdList = document.getElementById('selected-prod-list');
const prodCatTemplate = document.getElementById('prod-cat-template');
const prodTemplate = document.getElementById('prod-template');
const selectedProdTemplate = document.getElementById('selected-prod-template');
const expandIcons = { more: 'expand_more', less: 'expand_less' };
const selectedProducts = {
    catIds: {},
    setCatId(catId, numOf) {
        this.catIds[catId] = { numOf, selected: 0 };
    },
    getEntryId(prodId) {
        return `entry-${prodId}`;
    },
};
let idCounter = 1000;

// Handle list functions

const checkProd = (prodCheckbox, editCat) => {
    const prodId = prodCheckbox.id;
    const newSelectedProd = selectedProdTemplate.content.cloneNode(true);
    newSelectedProd.querySelector('li').id = selectedProducts.getEntryId(prodId);
    newSelectedProd.querySelector('li').textContent = prodCheckbox.getAttribute('value');
    selectedProdList.appendChild(newSelectedProd);
    if (editCat) {
        const catId = prodCheckbox.getAttribute('data-cat-id');
        selectedProducts.catIds[catId].selected++;
        if (selectedProducts.catIds[catId].selected < selectedProducts.catIds[catId].numOf) {
            prodMenuList.querySelector(`#${catId}`).indeterminate = true;
        } else {
            prodMenuList.querySelector(`#${catId}`).indeterminate = false;
            prodMenuList.querySelector(`#${catId}`).checked = true;
        }
    }
};

const unCheckProd = (prodCheckbox, editCat) => {
    const prodId = prodCheckbox.id;
    selectedProdList.removeChild(
        selectedProdList.querySelector(`#${selectedProducts.getEntryId(prodId)}`),
    );
    if (editCat) {
        const catId = prodCheckbox.getAttribute('data-cat-id');
        selectedProducts.catIds[catId].selected--;
        if (selectedProducts.catIds[catId].selected !== 0) {
            prodMenuList.querySelector(`#${catId}`).indeterminate = true;
        } else {
            prodMenuList.querySelector(`#${catId}`).indeterminate = false;
            prodMenuList.querySelector(`#${catId}`).checked = false;
        }
    }
};

const checkProdCat = (catId, prodCatOl) => {
    selectedProducts.catIds[catId].selected = selectedProducts.catIds[catId].numOf;
    const prodCheckboxes = prodCatOl.querySelectorAll('input');
    prodCheckboxes.forEach((i) => {
        if (!i.checked) {
            i.checked = true;
            checkProd(i, false);
        }
    });
};

const unCheckProdCat = (catId, prodCatOl) => {
    selectedProducts.catIds[catId].selected = 0;
    const prodCheckboxes = prodCatOl.querySelectorAll('input');
    prodCheckboxes.forEach((i) => {
        if (i.checked) {
            i.checked = false;
            unCheckProd(i, false);
        }
    });
};

// create list functions

const addCatToMenu = (prodCat) => {
    const newProdCat = prodCatTemplate.content.cloneNode(true);
    const newProdCatId = `cat-${idCounter++}`;
    newProdCat.querySelector('input').id = newProdCatId;
    newProdCat.querySelector('label').setAttribute('for', newProdCatId);
    newProdCat.querySelector('label').textContent = prodCat;
    selectedProducts.setCatId(newProdCatId, products[prodCat].length);

    products[prodCat].forEach((prod) => {
        const newProd = prodTemplate.content.cloneNode(true);
        const newProdId = idCounter++;
        newProd.querySelector('input').id = newProdId;
        newProd.querySelector('input').setAttribute('data-cat-id', newProdCatId);
        newProd.querySelector('input').setAttribute('value', prod);
        newProd.querySelector('label').setAttribute('for', newProdId);
        newProd.querySelector('label').textContent = prod;

        newProd.querySelector('input').addEventListener('change', (e) => {
            if (e.currentTarget.checked) {
                checkProd(e.currentTarget, true);
            } else {
                unCheckProd(e.currentTarget, true);
            }
        });

        newProdCat.querySelector('ol').appendChild(newProd);
    });

    newProdCat.querySelector('button').addEventListener('click', (e) => {
        const newProdCatOl = e.currentTarget.parentNode.querySelector('ol');
        if (newProdCatOl.style.display !== 'none') {
            newProdCatOl.style.display = 'none';
            e.currentTarget.querySelector('span').textContent = expandIcons.more;
        } else {
            newProdCatOl.style.display = 'block';
            e.currentTarget.querySelector('span').textContent = expandIcons.less;
        }
    });

    newProdCat.querySelector('input').addEventListener('change', (e) => {
        const newProdCatOl = e.currentTarget.parentNode.querySelector('ol');
        const catId = e.currentTarget.id;
        if (e.currentTarget.checked) {
            checkProdCat(catId, newProdCatOl);
        } else {
            unCheckProdCat(catId, newProdCatOl);
        }
    });

    prodMenuList.appendChild(newProdCat);
};

const createMenu = () => {
    Object.keys(products).forEach((prodCat) => {
        addCatToMenu(prodCat);
    });
};

// Fetch data

const fetchData = (url) => (fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Http error: ${res.status}`));
    })
    .then((res) => {
        Object.keys(res).forEach((i) => {
            if (products[i]) {
                res[i].forEach((j) => {
                    if (products[i].indexOf(j) === -1) {
                        products[i].push(j);
                    }
                });
            } else {
                products[i] = [...res[i]];
            }
        });
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
    })
);

const getData = async () => {
    const urlA = 'http://localhost:8080/productsA';
    const urlB = 'http://localhost:8080/productsB';
    await fetchData(urlA);
    await fetchData(urlB);
    createMenu();
};

getData();
