import React, {useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';


function Write(){
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.get("/inserttip", {
            params: {
              name : sessionStorage.getItem("nickname"),
              title : data.title,
              detail: data.detail
            }
          }).then(() => {
            navigate('/tip');
          })
      };

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitted, errors },
      } = useForm();
    
      return (
        
        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            id="title"
            type="text"
            placeholder="제목"
            aria-invalid={
              isSubmitted ? (errors.text ? "true" : "false") : undefined
            }
            {...register("title", {
              required: "제목은 필수 입력입니다.",
              minLength: {
                value:  4,
                message: "최소 4글자 이상의 제목을 입력하세요.",
              },
            })}
          />
          {errors.title && <small role="alert">{errors.title.message}</small>}
          <br/>
          <br/>

          <textarea
            id="detail"
            type="text"
            placeholder="내용"
            
            aria-invalid={
              isSubmitted ? (errors.detail ? "true" : "false") : undefined
            }
            {...register("detail", {
              required: "내용은 필수 입력입니다.",
              minLength: {
                value: 10,
                message: "최소 10글자 이상의 내용을 입력해주세요.",
              },
            })}
            
          />
          {errors.detail && <small role="alert">{errors.detail.message}</small>}
          <br/>
          <button type="submit" disabled={isSubmitting}>
            글쓰기
          </button>
        </form>

      );
  }

export default Write