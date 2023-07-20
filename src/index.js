import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common["x-api-key"] = "live_G8r6oLtNkRoSlieCAZMonLwOGX3OhcR5Kj1FOY8VQoFwdXlg98W65xsQgjkb8wW4";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
const refs = {
        selectEl: document.querySelector('.breed-select'),
        loaderEl: document.querySelector('.loader'),
        catInform: document.querySelector('.cat-info'),
        errorEl: document.querySelector('.error')
    }


fetchBreeds().then(data =>  createMarkup(data)).catch(err => console.log(err))
 function createMarkup(data) {
    refs.selectEl.hidden = false;
    refs.selectEl.innerHTML =  data.map(({id, name}) => `
          <option value=${id}>${name}</option>`)
              .join('')
            
              new SlimSelect({
                select: refs.selectEl
            })
          
          }

refs.selectEl.addEventListener('change', onSelect)

function onSelect(event) {
    refs.loaderEl.hidden = false;
    refs.catInform.innerHTML = '';
    fetchCatByBreed(event.target.value)
                .then(data => {
                    refs.catInform.innerHTML = data.map(
                        ({ url, breeds: [{ name, description, temperament }] }) =>
                         `<img src="${url}" alt="${name}" width="300">
                <h3>${name}</h3>
                <p>${description}</p>
                <p><b>Temperament:</b>${temperament}</p>` 
                    ).join('');
                })
                            .catch(() => {
                              Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
                            })
                .finally(() => (refs.loaderEl.hidden = true));
                }









