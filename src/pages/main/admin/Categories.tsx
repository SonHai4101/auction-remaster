import { Text } from "@/components/retroui/Text";
import React from "react";

export const Categories = () => {
  return (
    <div>
      <div className="flex justify-between">
        <Text as="h2">Categories</Text>
      </div>
      <section className="w-full mt-5 grid grid-rows-[repeat(auto-fit, 1fr)] grid-cols-[repeat(3,1fr)] gap-2">
        <div className="bg-amber-500 h-[100px] grid place-content-center">helo</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
      </section>
    </div>
  );
};
