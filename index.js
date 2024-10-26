const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const API_INFO='http://localhost:3000/infos'

function start(){
    getAPI(handlerRenderApi)
    handlerAddApi()
}

start()

function getAPI(infos){
    fetch(API_INFO)
                .then((response)=>response.json())
                .then(infos)
}


function handlerRenderApi(infos){
    let renderHtml= infos.map((info)=>{
        return `
                <tr class="data-item-${info.id}">
                <td class="data-id">${info.id}</td>
                <td class="data-code">${info.code}</td>
                <td class="data-name">${info.name}</td>
                <td class="data-gender">${info.gender}</td>
                <td class="data-point">${info.point}</td>
                <td class="data-rating">${info.rating}</td>
                <td><button onclick="handlerFixApi(${info.id})">Sửa</button></td>
                <td><button onclick="handlerDeleteApi(${info.id})">Xóa</button></td>
                </tr>
                `
    })

    let html= renderHtml.join('')
    $('.show_info').innerHTML= html

}


function addAPI(data,infos){
    let my_obj_add={
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }
    fetch(API_INFO,my_obj_add)
                            .then((response)=>response.json())
                            .then(infos)
}


function handlerAddApi(){
    $('#btn_add').onclick=function(){
        let code_input= $(".code_api").value
        let name_input=$(".name_api").value
        let gender_input=$(".gender_api").value
        let point_input=$(".point_api").value
        let rating_input=$(".rating_api").value
        let data={
            code:code_input.toUpperCase(),
            name:name_input,
            gender:gender_input,
            point:point_input,
            rating:rating_input
        }
        addAPI(data,()=>{
            getAPI(handlerRenderApi)
        })
    }
}


function handlerDeleteApi(id){
    let my_obj_delete={
        method:"delete"
    }
    fetch(API_INFO+"/"+id ,my_obj_delete)
                                .then((response)=>response.json())
                                .then(()=>{
                                    let data_item=$('.data-item-'+id)
                                    if(data_item){
                                        data_item.remove()
                                    }
                                })
}


function fixAPI(id,new_data,infos){
    let my_obj_fix={
        method:"put",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(new_data)
    }
    fetch(API_INFO+"/"+id,my_obj_fix)
                                    .then((response)=>response.json())
                                    .then(infos)
}

function handlerFixApi(id){
    let person_info=$('.data-item-'+id)
    let person_code=person_info.querySelector('.data-code').innerText
    let person_name=person_info.querySelector('.data-name').innerText
    let person_gender=person_info.querySelector('.data-gender').innerText
    let person_point=person_info.querySelector('.data-point').innerText
    let person_rating=person_info.querySelector('.data-rating').innerText
    let person_code_input=$(".code_api")
    let person_name_input=$(".name_api")
    let person_gender_input=$(".gender_api")
    let person_point_input=$(".point_api")
    let person_rating_input=$(".rating_api")
    let btn_add=$('#btn_add')
    let btn_create=$('#btn_create')
    person_code_input.value=person_code
    person_name_input.value=person_name
    person_gender_input.value=person_gender
    person_point_input.value=person_point
    person_rating_input.value=person_rating
    btn_add.style.display="none"
    btn_create.style.display="block"
    btn_create.onclick=function(){
        let new_data={
            code:person_code_input.value.toUpperCase(),
            name:person_name_input.value,
            gender:person_gender_input.value,
            point:person_point_input.value,
            rating:person_rating_input.value
        }
        fixAPI(id,new_data,()=>{
            person_code_input.value=""
            person_name_input.value=""
            person_gender_input.value=""
            person_point_input.value=""
            person_rating_input.value=""
            btn_add.style.display="block"
            btn_create.style.display="none"
            getAPI(handlerRenderApi)

        })
    }
}