import { useState } from "react";
import { toast } from "react-toastify";

import { StarIcon } from "lucide-react";

import { Button } from "@/components/utility";
import { Modal, ModalActions, ModalContent } from "@/components/utility/modal";
import { RatingResponse, useProduct } from "@/contexts/ProductContext";
import productApi from "@/features/product/api";
import { useMutation } from "@/lib/api";
import { State } from "@/types";
import { cn } from "@/utils";

import ProductRatingStars from "./ProductRatingStars";

function ProductRating() {
  const product = useProduct();
  const [isOpened, setIsOpened] = useState(false);
  const [localRating, setLocalRating] = useState(product.rating);

  return (
    <div className="flex w-full items-center justify-between mb-5 flex-wrap gap-4">
      <div className="flex items-center gap-2 px-1 w-full">
        <StarIcon
          className={cn(
            "text-warning",
            localRating.ratingsCount > 0 && "fill-warning"
          )}
        />
        میانگین امتیاز: {localRating.averageRating} ( {localRating.ratingsCount}{" "}
        رای )
      </div>
      <Button
        onClick={() => setIsOpened(true)}
        className="h-10 pt-[9px] pb-3.5 lg:w-full"
        isWide
      >
        ارسال رتبه
      </Button>
      {isOpened && (
        <ProductRatingModal
          initialRatingNumber={localRating.myRating}
          setIsOpened={setIsOpened}
          setLocalRating={setLocalRating}
        />
      )}
    </div>
  );
}

export default ProductRating;

type ProductRatingModalProps = {
  setLocalRating: State<RatingResponse["rating"]>[1];
  setIsOpened: State<boolean>[1];
  initialRatingNumber?: number;
};

function ProductRatingModal({
  setLocalRating,
  setIsOpened,
  initialRatingNumber,
}: ProductRatingModalProps) {
  const product = useProduct();
  const [ratingNumber, setRatingNumber] = useState(
    initialRatingNumber != null ? initialRatingNumber - 1 : 0
  );

  const { mutate, status } = useMutation(productApi.rate, {
    onSuccess: (result) => {
      setLocalRating(result.data.rating);
      setIsOpened(false);
      toast.success(result.message);
    },
  });

  return (
    <Modal>
      <ModalContent>
        <p>چه امتیازی به این اثر میدی ؟</p>
        <ProductRatingStars
          ratingNumber={ratingNumber}
          handleOnRatingChange={setRatingNumber}
        />
        <ModalActions>
          <Button onClick={() => setIsOpened(false)} className="flex-1">
            لغو
          </Button>
          <Button
            isLoading={status === "pending"}
            onClick={() => {
              mutate({
                params: {
                  productId: product.id,
                  ratingNumber: ratingNumber + 1,
                },
              });
            }}
            className="flex-1"
          >
            ارسال امتیاز
          </Button>
        </ModalActions>
      </ModalContent>
    </Modal>
  );
}
