import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

export const Form=() =>{

    const onSubmit =(data) =>{
        console.log(data)
    }

    const schema=yup.object().shape({
        fullName: yup.string().required("Your FullName is required"),        
        email: yup.string().email().required(),
        age: yup.number().positive().integer().min(18).required(),
        password:yup.string().min(4).max(20).required(),
        confirmPassword:yup
        .string()
        .oneOf([yup.ref("password"),null],"Passwords Don't match")
        .required(),
    });

    const {register,handleSubmit,formState:{errors},} = useForm({
        resolver: yupResolver(schema)

    });



    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="full name ..." {...register("fullName")}/>
        <p>{errors.fullName?.message}</p>
        <input type="text" placeholder="Email ..." {...register("email")} />
        <p>{errors.email?.message}</p>
        <input type="number" placeholder="Age ..." {...register("age")}/>
        <p>{errors.age?.message}</p>
        <input type="password" placeholder="Password ..."{...register("password")} />
        <p>{errors.password?.message}</p>
        <input type="password" placeholder="Confirm Password ..."{...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>
        <input type="submit"/>
        </form>
    );

 } ;