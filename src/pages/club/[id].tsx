import BackButton from "@/components/common/BackButton";
import Stat from "@/components/common/Stat";
import { Button } from "@/components/form/Button";
import { Icon } from "@iconify/react";
import { get } from "http";
import { NextPage, NextPageContext } from "next";
import { AppContext } from "next/app";

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;

  return {
    props: {
      id,
    },
  };
}

interface Props {
  id: string | null;
}

const Club: NextPage<Props> = ({ id }) => {
  console.log(id);

  return (
    <>
      <div className="z-10 mx-auto flex max-w-6xl flex-col gap-5 px-3 py-3">
        <BackButton />
        <div className="flex flex-col gap-6 md:flex-row md:gap-9">
          <img
            className="h-[10rem] w-[10rem] rounded-2xl md:h-[200px] md:w-[200px]"
            src="https://s3.tech.nisit.ku.ac.th/assets/partner/KUBlockchain.jpg"
            alt=""
          />
          <div className="flex flex-col justify-center gap-2 md:gap-3">
            <div className="text-sm">Technology</div>
            <div className="text-2xl font-bold md:text-4xl">KU Blockchain Society</div>
            <Stat
              {...{
                likes: 200,
                views: 200,
                location: "วิทยาเขตบางเขน",
              }}
            />
          </div>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi tenetur perspiciatis ad
          ipsam dolorum quo labore eum! Doloremque, fuga possimus quas ab modi esse similique at
          accusamus sit labore, explicabo tempora perspiciatis quo ipsum provident nostrum! Facilis,
          sequi laborum soluta at sapiente corporis ducimus sunt! Quam non perferendis voluptatum
          nostrum in explicabo odit delectus est commodi vero ipsam pariatur laborum, dolore minus
          repellat adipisci dolorem et totam nisi! Nam perspiciatis cupiditate cumque veritatis,
          doloribus porro ipsum facere ipsa, temporibus a modi, nostrum enim id placeat possimus
          dolorem nemo? Quo voluptas maiores asperiores aspernatur error ducimus, animi obcaecati
          eveniet a quod natus voluptates beatae modi, laboriosam repudiandae ut rerum reiciendis
          totam blanditiis! Ipsam architecto molestiae, fuga et tempore ab perferendis quis, autem
          dolore obcaecati atque optio quas voluptatibus voluptas esse asperiores ducimus
          perspiciatis facere beatae! Repellat facilis qui voluptate. Nisi deserunt nesciunt cumque,
          quos saepe dolorum nulla, autem aperiam odit mollitia vero ab. Sed accusantium fugiat
          animi tenetur dolore, omnis aspernatur? Vel facere excepturi quaerat ratione, corrupti
          dolor voluptates fuga incidunt maxime pariatur et veritatis placeat reprehenderit quae,
          harum eos optio dolore assumenda consequuntur! Amet, numquam voluptatibus consequuntur,
          adipisci ab voluptatum rem obcaecati eveniet minima tempore laborum recusandae ducimus
          maiores nam repellendus sit modi totam non vel rerum incidunt hic odio cupiditate. Vero
          nemo maiores, accusantium laborum at sunt aliquam dolore dignissimos fugiat voluptates
          beatae nam autem dolores libero tempore quia adipisci nihil incidunt impedit eum! Laborum
          neque, doloribus consectetur voluptatibus dolore fugit harum similique quidem incidunt
          unde quia cupiditate, qui ipsa obcaecati repellat nam laboriosam sequi ipsum? Cumque
          repudiandae architecto laboriosam quo aspernatur dolor voluptatibus error, veniam
          consequuntur enim ut possimus ipsam tempora, atque excepturi magnam iusto ex dolorem harum
          ea esse odio. Culpa molestiae quia dolorum dignissimos eos possimus. Et atque asperiores
          porro. Nostrum quisquam deserunt, debitis ut pariatur eaque dolor architecto inventore
          obcaecati perspiciatis tenetur. Dicta inventore vel, veniam esse blanditiis corrupti saepe
          consequatur ex cupiditate quos vero, ab consequuntur. Est ex nihil nesciunt veniam
          blanditiis harum quam impedit fugiat similique. Corporis iusto quas aliquam beatae sed
          ullam, laudantium tempora exercitationem enim laboriosam dolor unde vel ipsum veniam quae
          autem impedit praesentium suscipit nobis consequatur dolore, voluptatum amet. In atque
          repellendus officia, enim, incidunt perferendis illum eligendi ipsum similique porro
          maiores nihil, quo eum reiciendis quidem impedit aliquam rerum vel quod eos dolorem amet.
          Quod odit, molestias in impedit provident porro molestiae rem error ipsa nisi, tempore
          minima ea placeat nesciunt sapiente perspiciatis iure? Itaque quaerat dolorum ipsam dolor
          nesciunt, quas inventore qui ducimus blanditiis fugiat dignissimos. Consectetur possimus
          voluptas similique animi. Iure pariatur fugit voluptates animi totam nihil, amet quisquam
          sapiente provident aperiam veritatis ad magnam, earum laudantium dolor? Obcaecati suscipit
          non corporis ut omnis similique tempora nisi! Dolorem voluptatum suscipit corporis debitis
          quod voluptatem quidem illo ducimus harum distinctio alias possimus optio dicta iste
          perspiciatis facilis, id ea magni a. Eveniet odit impedit dignissimos aperiam, similique
          laudantium. Eos nam ipsam maxime illum officia. Nam delectus consequatur distinctio dolore
          nostrum quam natus praesentium recusandae. Vitae, quod consequatur.
        </div>
      </div>
    </>
  );
};

export default Club;
