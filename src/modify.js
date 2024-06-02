import React, {useState, useEffect} from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Modify(){

    const {id} = useParams();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.get("/updatetipwrite", {
            params: {
              idx : id,
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
        setValue
      } = useForm();
    
    useEffect(() => {
        axios.get("/selectone", {
            params: {
              idx : id
            }
          }).then((res) => {
            setValue('title', res.data.title); // 수정된 데이터로 title 값을 설정
            setValue('detail', res.data.detail); // 수정된 데이터로 detail 값을 설정
      
        })
    }, [id]);


      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
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
          
          <label htmlFor="detail">내용</label>
          <textarea
            id="detail"
            type="text"
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
            수정하기
          </button>
        </form>
      );
  }

export default Modify