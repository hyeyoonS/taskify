import React from "react";
import { toast, ToastContainer } from "react-toastify"; // ToastContainer를 추가로 가져옵니다.
import styled from "styled-components";
import { DeviceSize } from "@/styles/DeviceSize";
import "react-toastify/dist/ReactToastify.css";

function ToastModal() {
  return (
    <div>
      <StyledContainer position="bottom-center" limit={1} closeButton={true} autoClose={4000} hideProgressBar />
    </div>
  );
}

export default ToastModal;

const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    width: 300px;

    @media (max-width: ${DeviceSize.mobile}) {
      width: 200px;
    }
  }

  .Toastify__toast {
    border-radius: 8px;

    text-align: center;

    background-color: var(--Main);
    color: #fff;
  }

  .Toastify__toast-body {
    padding: 1.4rem 2rem;

    font-size: 1.2rem;
    font-weight: 500;

    @media (max-width: ${DeviceSize.mobile}) {
      padding: 1.2rem 1.6rem;
    }
  }

  .Toastify__progress-bar {
    background-color: #fff;
  }
`;
