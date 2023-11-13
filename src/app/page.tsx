import Header from "@/components/Header/Navbar";
import ProviderCard from "@/components/ProviderCard/ProviderCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type ProviderCardProps = {
	profileImg: string;
	providerImgPreview: string;
	name: string;
	serviceTitle: string;
	price: number;
	id: string;
};

const ProvidersInfo: ProviderCardProps[] = [
	{
	  id: "someid1",
	  profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
	  providerImgPreview: "https://via.placeholder.com/150",
	  name: "Alice Johnson",
	  serviceTitle: "I will clean your windows",
	  price: 899,
	},
	{
	  id: "someid2",
	  profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
	  providerImgPreview: "https://via.placeholder.com/150",
	  name: "Bob Smith",
	  serviceTitle: "I will mow your lawn",
	  price: 1499,
	},
	{
	  id: "someid3",
	  profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
	  providerImgPreview: "https://via.placeholder.com/150",
	  name: "Eva Martinez",
	  serviceTitle: "I will paint your walls",
	  price: 1999,
	},
	{
	  id: "someid4",
	  profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
	  providerImgPreview: "https://via.placeholder.com/150",
	  name: "Charlie Davis",
	  serviceTitle: "I will assemble your furniture",
	  price: 799,
	},
	{
	  id: "someid5",
	  profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
	  providerImgPreview: "https://via.placeholder.com/150",
	  name: "Grace Turner",
	  serviceTitle: "I will walk your dog",
	  price: 499,
	},
	// Add more entries as needed
  ];
	

export default function Home() {
	return (
		<main className="min-h-screen w-full   ">
			<div className="w-full">
				<Header />
			</div>
			<div className="z-10 max-w-5xl w-full m-auto ">
				<div className="">
					<h1 className="py-10 text-4xl font-semibold">Hello, Michael</h1>
					<div>
						<Card className="">
							<CardHeader>
								<CardTitle>Services You May Like</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex gap-4 flex-wrap">
									{ProvidersInfo.map((provider) => (
									
										<ProviderCard key={provider.id} provider={provider} />
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</main>
	);
}
