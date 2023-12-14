import { api } from '@/utils/api';
import { Statistic } from 'antd';
import { EyeIcon } from 'lucide-react';
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router';

export async function getServerSideProps(ctx: NextPageContext) {
    const { id } = ctx.query;
    return {
        props: {
            id,
            clubData: null,
            click: false,
        },
    };
}

interface Props {
    id: string;
}

const MyClub: NextPage<Props> = ({ id }) => {
    const { push } = useRouter();
    const getStatisticsApi = api.club.getStatistics.useQuery(id);

    return (
        <div className='flex flex-col'>
            <div className='flex gap-5 flex-col md:flex-row'>
                <Statistic loading={getStatisticsApi.isLoading} prefix={<EyeIcon />} title="จำนวนคนเข้าชม" className='border p-5 rounded-2xl w-full' value={getStatisticsApi.data?.views} />
                <Statistic loading={getStatisticsApi.isLoading} prefix={<EyeIcon />} title="จำนวนกด like" className='border p-5 rounded-2xl w-full' value={getStatisticsApi.data?.likes} />
            </div>
        </div>
    )
}

export default MyClub