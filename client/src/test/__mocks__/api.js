const data = {
    field_data: [
        { id: 15, name: "Computer Animation" },
        { id: 19, name: "Copywriting" },
        { id: 20, name: "Costume Design" },
        { id: 21, name: "Crafts" },
        { id: 137, name: "Creative Direction" },
        { id: 23, name: "Culinary Arts" },
        { id: 122, name: "Digital Art" },
        { id: 27, name: "Digital Photography" },
    ],
    gallery: [
        {

            admin_lock: 0,
            created_on: 1209656603,
            creator_id: 72409,
            data: "",
            follower_count: 6568,
            gallery_text: "View Collection",
            id: 14138,
            is_coowner: false,
            is_owner: false,
            label: "WEB-DESIGN",
            latest_projects: [],
            modified_on: 1515513311,
            multiple_owners: false,
            owners: [],
            privacy: "public",
            project_count: 627,
            project_covers: [],
            public: 1,
            show_lock: false,
            stats: { items: 627, followers: 6568 },
            title: "WEB-DESIGN",
            updated_on: 1515513311,
            url: "https://www.behance.net/collection/14138/WEB-DESIGN",
            user_id: 72409
        },
        {
            admin_lock: 0,
            created_on: 1209656603,
            creator_id: 72409,
            data: "",
            follower_count: 6568,
            gallery_text: "View Collection",
            id: 14138,
            is_coowner: false,
            is_owner: false,
            label: "WEB-DESIGN",
            latest_projects: [],
            modified_on: 1515513311,
            multiple_owners: false,
            owners: [],
            privacy: "public",
            project_count: 627,
            project_covers: [],
            public: 1,
            show_lock: false,
            stats: { items: 627, followers: 6568 },
            title: "WEB-DESIGN",
            updated_on: 1515513311,
            url: "https://www.behance.net/collection/14138/WEB-DESIGN",
            user_id: 72409
        }
    ]
}



const getGallery = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        return data ? resolve(data) : reject({ error: 'No data'})
    }, 1000)
        
})

export default getGallery

