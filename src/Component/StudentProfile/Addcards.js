import { CloudOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import GlobalProvider from "../../Context/Index";
import BillingModal from "./BillingModal";
import "../../Style/addCards.css";
import Styled from "styled-components";
import styled from "styled-components";

const Addcards = () => {
  const { baseurl } = GlobalProvider();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [card, setCard] = useState("");
  const [cardInfo, setCardInfo] = useState("");
  const [isdefaultCard, setIsDefaultCard] = useState("");
  const [defaultLoading, setDefaultLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteCard, setDeleteCard] = useState("");
  const [cardType, setCardType] = useState("");

  useEffect(() => {
    baseurl
      .get("billing/payment-methods/")
      .then((res) => {
        // console.log(res.data);
        setCardInfo(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [isdefaultCard, card, deleteCard]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDeleteModal(false);
  };

  const defaultCard = (id) => {
    // console.log(loading);
    setDefaultLoading(id);
    console.log(defaultLoading);
    baseurl
      .post(`billing/payment-methods/${id}/make_default/`)
      .then((res) => {
        // setDefaultLoading(false);
        setIsDefaultCard(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandle = (id) => {
    setDeleteLoading(true);
    console.log(cardType.default);
    if (cardType.default === true) {
      alert("Please chose another card, this is default");
      setDeleteModal(false);
    }
    baseurl
      .delete(`billing/payment-methods/${id}`)
      .then((res) => {
        setDeleteCard(res.data);
        console.log(res);
        setDeleteLoading(false);
        setDeleteModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    !loading && (
      <div>
        <div className="flex justify-end ">
          <Button
            onClick={showModal}
            className="flex items-center text-base font-bold text-[#3f8cfe] bg-[#ecf4ff] rounded-lg py-5 px-4 gap-1"
          >
            <svg
              data-v-b906df7c=""
              fill="none"
              height="21"
              viewBox="0 0 20 21"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <g data-v-b906df7c="" mask="url(#mask0_648_9543)">
                <path
                  data-v-b906df7c=""
                  d="M15.1427 10.4528H4.76172"
                  stroke="#3F8CFE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                ></path>
                <path
                  data-v-b906df7c=""
                  d="M9.9543 15.6429V5.26196"
                  stroke="#3F8CFE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                ></path>
              </g>
            </svg>
            <span>Add new card</span>
          </Button>
        </div>
        <Modal
          // style={{ borderRadius: "20px" }}
          centered="true"
          // closable="true"
          title={
            <span className="flex items-center justify-between mb-10">
              <h1 className="text-2xl font-extrabold text-[#042040] font-['Nunito_sans'] m-0">
                Add Payment Method
              </h1>
              {/* <span
                onClick={handleCancel}
                className="w-9 h-9 bg-[#f6f8fa] rounded-full flex items-center justify-center hover:bg-blue-600 hover:stroke-white"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.7966 1.00366L1.00391 8.79635"
                    stroke="#042040"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8.79919 8.80082L1 1"
                    stroke="#042040"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span> */}
            </span>
          }
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <BillingModal setCard={setCard} setIsModalOpen={setIsModalOpen} />
        </Modal>

        {/* cards display */}
        <div className="grid grid-cols-12 grid-flow-row gap-5 mt-5">
          {cardInfo.map((card) => {
            return (
              <div key={card.djstripe_id} className="col-span-6">
                <div className="card__design">
                  <div className={"p-6"}>
                    <div className={"flex justify-between"}>
                      {card.card.brand === "visa" ? (
                        <svg
                          className={"w-12 h-12"}
                          width="121"
                          height="38"
                          viewBox="0 0 121 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M49.8852 0L43.8626 37.4777H53.4889L59.5077 0H49.8852ZM78.9215 15.2663C75.5576 13.6051 73.4954 12.4839 73.4954 10.7849C73.5365 9.24007 75.2392 7.65742 79.0416 7.65742C82.1691 7.57886 84.4678 8.31384 86.2117 9.04512L87.0852 9.43502L88.394 1.59375C86.4926 0.858776 83.4778 0.0489419 79.754 0.0489419C70.2478 0.0489419 63.554 4.99143 63.5125 12.0603C63.4339 17.2767 68.3049 20.1714 71.9501 21.9078C75.674 23.6891 76.9416 24.8441 76.9416 26.4267C76.9004 28.8566 73.9305 29.9778 71.1592 29.9778C67.3194 29.9778 65.2568 29.4003 62.1256 28.0464L60.858 27.4689L59.5119 35.6178C61.7731 36.623 65.9317 37.5077 70.2482 37.553C80.3508 37.553 86.9244 32.6853 87.0071 25.1517C87.04 21.019 84.4715 17.8537 78.9215 15.2663ZM113.073 0.115983H105.625C103.33 0.115983 101.586 0.776106 100.592 3.13116L86.2935 37.4777H96.3961L99.1784 30.0415H110.481L111.925 37.5077H120.835L113.073 0.115983ZM101.98 22.5371C102.175 22.556 105.858 10.3983 105.858 10.3983L108.79 22.5371C108.79 22.5371 103.882 22.5371 101.98 22.5371ZM35.819 0L26.3877 25.4626L25.3603 20.4412C23.6164 14.6473 18.1491 8.35127 12.0476 5.22381L20.6839 37.4403H30.8691L46.0042 0.00411065H35.819V0Z"
                            fill="#2394BC"
                          ></path>
                          <path
                            d="M22.1876 4.83339C21.4526 1.97573 19.1086 0.0484228 15.9252 0.0072937H0.988784L0.834961 0.70073C12.4864 3.57319 22.2661 12.4118 25.4388 20.7257L22.1876 4.83339Z"
                            fill="#EFC75E"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className={"w-12 h-12"}
                          width="121"
                          height="94"
                          viewBox="0 0 121 94"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.9508 93.393V87.1808C21.9508 84.7989 20.5009 83.2462 18.0158 83.2462C16.7735 83.2462 15.4274 83.6603 14.4954 85.0064C13.7709 83.8674 12.7356 83.2462 11.1825 83.2462C10.1467 83.2462 9.11189 83.5566 8.28319 84.6956V83.4533H6.10886V93.393H8.28319V87.9052C8.28319 86.1455 9.21518 85.3168 10.665 85.3168C12.114 85.3168 12.8394 86.2488 12.8394 87.9052V93.393H15.0137V87.9052C15.0137 86.1455 16.0485 85.3168 17.3946 85.3168C18.8445 85.3168 19.569 86.2488 19.569 87.9052V93.393H21.9508ZM54.1512 83.4533H50.6312V80.4507H48.4569V83.4533H46.4896V85.4201H48.4564V89.9763C48.4564 92.2544 49.3884 93.6 51.8736 93.6C52.8056 93.6 53.8404 93.2897 54.5658 92.8755L53.9441 91.0116C53.323 91.4257 52.5985 91.5294 52.0806 91.5294C51.0453 91.5294 50.6312 90.9083 50.6312 89.8725V85.4201H54.1512V83.4533ZM72.5816 83.2458C71.3393 83.2458 70.511 83.8674 69.9932 84.6956V83.4533H67.8188V93.393H69.9932V87.8019C69.9932 86.1455 70.7176 85.2135 72.0637 85.2135C72.4778 85.2135 72.9957 85.3173 73.4098 85.4206L74.031 83.35C73.6169 83.2462 72.9957 83.2462 72.5816 83.2462V83.2458ZM44.7294 84.2815C43.6937 83.5566 42.2443 83.2462 40.6911 83.2462C38.2064 83.2462 36.55 84.4886 36.55 86.4558C36.55 88.1128 37.7923 89.0443 39.9666 89.3551L41.0019 89.4589C42.141 89.6655 42.7621 89.9763 42.7621 90.4942C42.7621 91.2186 41.9339 91.7365 40.484 91.7365C39.0346 91.7365 37.8956 91.2186 37.1707 90.7012L36.1354 92.3577C37.2744 93.1859 38.8276 93.6 40.3803 93.6C43.2795 93.6 44.9365 92.2544 44.9365 90.3904C44.9365 88.6302 43.5904 87.6982 41.5193 87.3878L40.484 87.2841C39.552 87.1803 38.8276 86.9737 38.8276 86.3526C38.8276 85.6276 39.552 85.2135 40.6911 85.2135C41.9339 85.2135 43.1762 85.7309 43.7974 86.0417L44.7294 84.2815ZM102.505 83.2462C101.262 83.2462 100.434 83.8674 99.9159 84.6956V83.4533H97.7416V93.393H99.9159V87.8019C99.9159 86.1455 100.641 85.2135 101.986 85.2135C102.401 85.2135 102.919 85.3173 103.333 85.4206L103.954 83.35C103.54 83.2462 102.919 83.2462 102.505 83.2462ZM74.7559 88.4231C74.7559 91.4257 76.8265 93.6 80.0366 93.6C81.486 93.6 82.5213 93.2897 83.5565 92.4614L82.5213 90.7012C81.693 91.3224 80.8648 91.6327 79.9328 91.6327C78.1726 91.6327 76.9303 90.3904 76.9303 88.4231C76.9303 86.5596 78.1726 85.3168 79.9328 85.2135C80.8648 85.2135 81.693 85.5239 82.5213 86.1455L83.5565 84.3853C82.5213 83.5566 81.486 83.2462 80.0366 83.2462C76.8265 83.2462 74.7559 85.4206 74.7559 88.4231ZM94.8428 88.4231V83.4533H92.6685V84.6956C91.9435 83.7641 90.9082 83.2462 89.5621 83.2462C86.7666 83.2462 84.5923 85.4206 84.5923 88.4231C84.5923 91.4257 86.7666 93.6 89.5621 93.6C91.0115 93.6 92.0473 93.0826 92.6685 92.1506V93.393H94.8428V88.4231ZM86.8699 88.4231C86.8699 86.6629 88.009 85.2135 89.8725 85.2135C91.6327 85.2135 92.8755 86.5596 92.8755 88.4231C92.8755 90.1833 91.6327 91.6327 89.8725 91.6327C88.009 91.529 86.8699 90.1833 86.8699 88.4231ZM60.8817 83.2462C57.9824 83.2462 55.9114 85.3168 55.9114 88.4231C55.9114 91.5294 57.982 93.6 60.985 93.6C62.4344 93.6 63.8843 93.1859 65.0233 92.2544L63.9876 90.7012C63.1593 91.3224 62.1241 91.7365 61.0888 91.7365C59.7427 91.7365 58.3966 91.1153 58.0857 89.3546H65.4374V88.5269C65.5412 85.3168 63.6772 83.2462 60.8812 83.2462H60.8817ZM60.8817 85.1097C62.2273 85.1097 63.1598 85.9384 63.3664 87.4916H58.1895C58.3966 86.1455 59.3286 85.1097 60.8817 85.1097ZM114.826 88.4231V79.5187H112.652V84.6956C111.927 83.7641 110.891 83.2462 109.545 83.2462C106.75 83.2462 104.575 85.4206 104.575 88.4231C104.575 91.4257 106.75 93.6 109.545 93.6C110.995 93.6 112.03 93.0826 112.652 92.1506V93.393H114.826V88.4231ZM106.853 88.4231C106.853 86.6629 107.992 85.2135 109.856 85.2135C111.616 85.2135 112.859 86.5596 112.859 88.4231C112.859 90.1833 111.616 91.6327 109.856 91.6327C107.992 91.529 106.853 90.1833 106.853 88.4231ZM34.1681 88.4231V83.4533H31.9938V84.6956C31.2688 83.7641 30.2336 83.2462 28.8875 83.2462C26.0919 83.2462 23.9176 85.4206 23.9176 88.4231C23.9176 91.4257 26.0919 93.6 28.8875 93.6C30.3373 93.6 31.3726 93.0826 31.9938 92.1506V93.393H34.1681V88.4231ZM26.0919 88.4231C26.0919 86.6629 27.231 85.2135 29.0945 85.2135C30.8547 85.2135 32.0975 86.5596 32.0975 88.4231C32.0975 90.1833 30.8547 91.6327 29.0945 91.6327C27.231 91.529 26.0919 90.1833 26.0919 88.4231Z"
                            fill="black"
                          ></path>
                          <path
                            d="M44.0045 7.9724H76.6195V66.576H44.0045V7.9724Z"
                            fill="#FF5F00"
                          ></path>
                          <path
                            d="M46.0755 37.2744C46.0755 25.3675 51.6665 14.8062 60.2601 7.97239C53.9446 3.00256 45.9722 0 37.2749 0C16.6697 0 0 16.6697 0 37.2744C0 57.8787 16.6697 74.5489 37.2744 74.5489C45.9718 74.5489 53.9442 71.5463 60.2601 66.576C51.6665 59.846 46.0755 49.1814 46.0755 37.2744Z"
                            fill="#EB001B"
                          ></path>
                          <path
                            d="M120.624 37.2744C120.624 57.8787 103.954 74.5489 83.3495 74.5489C74.6522 74.5489 66.6798 71.5463 60.3639 66.576C69.0612 59.7427 74.5489 49.1814 74.5489 37.2744C74.5489 25.3675 68.9575 14.8062 60.3639 7.97239C66.6794 3.00256 74.6522 0 83.3495 0C103.954 0 120.624 16.7735 120.624 37.2744H120.624Z"
                            fill="#F79E1B"
                          ></path>
                        </svg>
                      )}
                      {card.default === true ? (
                        <span className={"text-white font-bold"}>
                          (Default)
                        </span>
                      ) : (
                        <button onClick={() => defaultCard(card.id)}>
                          {defaultLoading === card.id ? (
                            <span>
                              <LoadingOutlined />{" "}
                            </span>
                          ) : (
                            <svg
                              data-v-171b956b=""
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                data-v-171b956b=""
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.2741 7.44177C2.44017 7.44153 2.59952 7.5074 2.71694 7.62482L4.16694 9.07479C4.41102 9.31887 4.41102 9.71462 4.16694 9.95871C3.92287 10.2028 3.52714 10.2028 3.28306 9.95871L2.27627 8.95196L1.27654 9.95746C1.03317 10.2022 0.637443 10.2034 0.392664 9.95996C0.147885 9.71662 0.146746 9.32087 0.39012 9.07612L1.83179 7.6261C1.94888 7.50833 2.10803 7.44201 2.2741 7.44177V7.44177Z"
                                fill="#ffffff"
                              ></path>{" "}
                              <path
                                data-v-171b956b=""
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.8325 10.0414C16.0766 9.7974 16.4723 9.7974 16.7163 10.0414L17.7244 11.0495L18.7325 10.0414C18.9766 9.7974 19.3723 9.7974 19.6163 10.0415C19.8604 10.2855 19.8604 10.6812 19.6163 10.9253L18.1663 12.3753C17.9223 12.6194 17.5266 12.6194 17.2825 12.3753L15.8325 10.9253C15.5884 10.6812 15.5884 10.2855 15.8325 10.0414V10.0414Z"
                                fill="#ffffff"
                              ></path>{" "}
                              <path
                                data-v-171b956b=""
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.48794 4.78314C5.01739 2.88483 7.36804 1.65857 9.99967 1.65857C14.6027 1.65857 18.3413 5.38796 18.3413 10.0002V11.9336C18.3413 12.2788 18.0615 12.5586 17.7163 12.5586C17.3712 12.5586 17.0913 12.2788 17.0913 11.9336V10.0002C17.0913 6.07919 13.9133 2.90857 9.99967 2.90857C7.76456 2.90857 5.76521 3.94904 4.46132 5.56739C4.24476 5.83618 3.8513 5.87852 3.58251 5.66195C3.31372 5.44539 3.27138 5.05194 3.48794 4.78314V4.78314Z"
                                fill="#ffffff"
                              ></path>{" "}
                              <path
                                data-v-171b956b=""
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2.28352 7.44177C2.62871 7.44177 2.90852 7.72159 2.90852 8.06677V10.0001C2.90852 13.9211 6.0866 17.0918 10.0002 17.0918C12.2352 17.0918 14.2346 16.0513 15.5385 14.433C15.7551 14.1642 16.1485 14.1219 16.4173 14.3384C16.6861 14.555 16.7284 14.9485 16.5119 15.2172C14.9824 17.1155 12.6317 18.3418 10.0002 18.3418C5.39712 18.3418 1.65852 14.6124 1.65852 10.0001V8.06677C1.65852 7.72159 1.93835 7.44177 2.28352 7.44177V7.44177Z"
                                fill="#ffffff"
                              ></path>{" "}
                              <path
                                data-v-171b956b=""
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.6694 8.17653L13.4101 7.72649C13.1907 7.34569 12.7045 7.21432 12.3231 7.43282V7.43282C12.1416 7.53975 11.925 7.57008 11.7211 7.51714C11.5172 7.4642 11.3427 7.33232 11.2362 7.15059C11.1676 7.03508 11.1308 6.90352 11.1294 6.7692V6.7692C11.1356 6.55386 11.0543 6.34519 10.9042 6.19072C10.754 6.03624 10.5477 5.94913 10.3323 5.94922H9.80978C9.59873 5.94922 9.39637 6.03332 9.24749 6.18291C9.09861 6.33251 9.01548 6.53527 9.01649 6.74632V6.74632C9.01024 7.18207 8.65519 7.53203 8.21939 7.53198C8.08508 7.53059 7.95351 7.49375 7.838 7.42519V7.42519C7.45668 7.20669 6.97045 7.33806 6.75105 7.71886L6.47263 8.17653C6.25349 8.55685 6.38307 9.04277 6.76249 9.26348V9.26348C7.00912 9.40587 7.16104 9.66902 7.16104 9.9538C7.16104 10.2386 7.00912 10.5017 6.76249 10.6441V10.6441C6.38356 10.8633 6.25383 11.3481 6.47263 11.7273V11.7273L6.73579 12.1811C6.83859 12.3666 7.01107 12.5035 7.21507 12.5615C7.41907 12.6194 7.63776 12.5937 7.82275 12.49V12.49C8.00461 12.3839 8.22132 12.3548 8.42471 12.4093C8.62811 12.4637 8.80134 12.5971 8.90589 12.7799C8.97445 12.8954 9.01129 13.027 9.01268 13.1613V13.1613C9.01268 13.6015 9.36955 13.9584 9.80978 13.9584H10.3323C10.771 13.9584 11.1273 13.6038 11.1294 13.1651V13.1651C11.1284 12.9534 11.212 12.75 11.3617 12.6003C11.5114 12.4506 11.7148 12.367 11.9265 12.368C12.0605 12.3716 12.1915 12.4083 12.3079 12.4748V12.4748C12.6882 12.6939 13.1741 12.5643 13.3948 12.1849V12.1849L13.6694 11.7273C13.7757 11.5448 13.8049 11.3275 13.7505 11.1235C13.6961 10.9195 13.5626 10.7456 13.3796 10.6403V10.6403C13.1966 10.535 13.0631 10.3611 13.0087 10.1571C12.9543 9.95306 12.9834 9.73578 13.0897 9.55334C13.1588 9.43266 13.2589 9.3326 13.3796 9.26348V9.26348C13.7567 9.04289 13.886 8.55981 13.6694 8.18034V8.18034V8.17653Z"
                                stroke="#ffffff"
                                strokeWidth="1.16667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                              <path
                                data-v-171b956b=""
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.0729 9.43876C9.78848 9.43876 9.55788 9.66936 9.55788 9.95383C9.55788 10.2383 9.78848 10.4689 10.0729 10.4689C10.3574 10.4689 10.588 10.2383 10.588 9.95383C10.588 9.66936 10.3574 9.43876 10.0729 9.43876ZM8.39121 9.95383C8.39121 9.02503 9.14415 8.27209 10.0729 8.27209C11.0017 8.27209 11.7547 9.02503 11.7547 9.95383C11.7547 10.8826 11.0017 11.6356 10.0729 11.6356C9.14415 11.6356 8.39121 10.8826 8.39121 9.95383Z"
                                fill="#ffffff"
                              ></path>
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    <h5
                      className={
                        "text-[1.125rem] leading-[1.75rem] font-extrabold"
                      }
                    >
                      **** **** **** {card.card.last4}
                    </h5>
                  </div>
                  <div className="flex justify-between items-center py-4 px-4 rounded-b-xl w-full absolute bottom-0 left-0 bg-[#042040]">
                    <div>
                      <p className="mb-0 text-[#7D8DA6] text-sm font-semibold ">
                        Expires
                      </p>
                      <p className="mb-0 text-[#7D8DA6] text-sm font-semibold">
                        {card.card.exp_month}/{card.card.exp_year}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setDeleteModal(card.id);
                          setCardType(card);
                        }}
                      >
                        <svg
                          data-v-171b956b=""
                          width="16"
                          height="18"
                          viewBox="0 0 16 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            data-v-171b956b=""
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.20448 17.3333C7.07531 17.3333 5.97448 17.3208 4.88531 17.2983C3.49198 17.2708 2.52781 16.3674 2.37031 14.9408C2.10781 12.5741 1.65865 6.99575 1.65448 6.93992C1.62615 6.59575 1.88281 6.29409 2.22698 6.26659C2.56615 6.25742 2.87281 6.49575 2.90031 6.83909C2.90448 6.89575 3.35281 12.4549 3.61281 14.8033C3.70198 15.6141 4.13948 16.0324 4.91115 16.0483C6.99448 16.0924 9.12031 16.0949 11.412 16.0533C12.232 16.0374 12.6753 15.6274 12.767 14.7974C13.0253 12.4691 13.4753 6.89575 13.4803 6.83909C13.5078 6.49575 13.812 6.25575 14.1528 6.26659C14.497 6.29492 14.7536 6.59575 14.7261 6.93992C14.7211 6.99659 14.2695 12.5891 14.0095 14.9349C13.8478 16.3908 12.8861 17.2766 11.4345 17.3033C10.3236 17.3224 9.25198 17.3333 8.20448 17.3333"
                            fill="#95A3BD"
                          ></path>
                          <path
                            data-v-171b956b=""
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.2567 4.82434H1.125C0.78 4.82434 0.5 4.54434 0.5 4.19934C0.5 3.85434 0.78 3.57434 1.125 3.57434H15.2567C15.6017 3.57434 15.8817 3.85434 15.8817 4.19934C15.8817 4.54434 15.6017 4.82434 15.2567 4.82434"
                            fill="#95A3BD"
                          ></path>
                          <path
                            data-v-171b956b=""
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.5322 4.82437C11.5839 4.82437 10.7605 4.14854 10.5739 3.21854L10.3714 2.2052C10.3289 2.05104 10.153 1.91687 9.95302 1.91687H6.42552C6.22552 1.91687 6.04968 2.05104 5.99885 2.24354L5.80468 3.21854C5.61885 4.14854 4.79468 4.82437 3.84635 4.82437C3.50135 4.82437 3.22135 4.54437 3.22135 4.19937C3.22135 3.85437 3.50135 3.57437 3.84635 3.57437C4.20135 3.57437 4.50968 3.32104 4.57968 2.9727L4.78218 1.95937C4.98802 1.1827 5.66052 0.66687 6.42552 0.66687H9.95302C10.718 0.66687 11.3905 1.1827 11.588 1.92187L11.7997 2.9727C11.8689 3.32104 12.1772 3.57437 12.5322 3.57437C12.8772 3.57437 13.1572 3.85437 13.1572 4.19937C13.1572 4.54437 12.8772 4.82437 12.5322 4.82437"
                            fill="#95A3BD"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Modal open={deleteModal} footer={null}>
          <p>{alert}</p>
          <div className="flex justify-center items-center gap-3 w-full">
            <button
              className="w-full text-center py-5 bg-white border border-gray-50 rounded-lg font-bold text-base text-gray-600"
              onClick={() => setDeleteModal(false)}
            >
              No
            </button>
            <button
              className="w-full text-center py-5 bg-blue-500 hover:bg-blue-400 border border-gray-50 rounded-lg font-bold text-base text-white"
              onClick={() => deleteHandle(deleteModal)}
            >
              {deleteLoading === true ? <LoadingOutlined /> : "Yes"}
            </button>
          </div>
        </Modal>
      </div>
    )
  );
};

export default Addcards;
