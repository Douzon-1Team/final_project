import React, {useEffect, useState} from 'react';
import {BtnBox2, BtnImg, IconBox} from "../../styles/ProfileStyle";
import {FcEditImage} from "react-icons/fc";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {ImgUploadFail, ImgUploadSuccess} from "../common/alert/alert";
import {updateImg} from "../../apis/ApiServices";

function EmpImg() {
  const empNo = useSelector( (state) => state.EMP_INFO.empInfo[0] );
  const accessToken = useSelector( (state) => state.ACCESS_TOKEN.accessToken);
  const { register, handleSubmit, setValue, watch } = useForm();
  const [profile, setProfile] = useState(null);

  const avatar = watch('image');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setProfile(URL.createObjectURL(file));
    }
  }, [avatar]);

  const onValid = async ({ empno, image }) => {
    const form = new FormData();
    form.append("file", image[0]);
    form.append("empNo", new Blob([empno], {type: "application/json"}));
    const response = await updateImg({form, accessToken});

    if(response){
      ImgUploadSuccess();
      window.location.reload();
    } else {
      ImgUploadFail();
    }
  };

  return (
    <>
      <input {...register("image")} id="icon" type="file" accept="image/*" hidden />
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('empno')} type="text" defaultValue={empNo} hidden />
        <label htmlFor="icon">
          <IconBox>
            <FcEditImage size="20px"/>
          </IconBox>
        </label>
        <BtnBox2>
          <BtnImg type="submit">사진 저장</BtnImg>
        </BtnBox2>
      </form>
    </>
  );
}

export default EmpImg;