-- Seed data for the Nook rental listings domain.
-- These statements are idempotent because Spring runs data.sql on every startup.

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    1,
    'https://www.rightmove.co.uk/properties/92771880',
    'Flat',
    'Part furnished',
    1,
    1,
    44.8,
    2578,
    2714,
    2974,
    '2026-09-04',
    'A well presented one bedroom apartment on the ground floor of this Georgian conversion moments from Regent''s Park. The property has a good sized reception room with wood flooring, built-in storage, high ceilings and space for both living and dining areas. There is a separate kitchen, double bedroom with storage, and a bathroom off the hallway.

Located moments from Regents Park, Marylebone High Street and the West End. Local stations are London Marylebone (Chiltern Railways, Bakerloo) and Baker Street (Bakerloo, Circle and Hammersmith & City, Jubilee, Metropolitan).',
    'Marylebone',
    'Gloucester Place',
    'Westminster',
    'NW1',
    'Marylebone Station',
    38,
    'D',
    1600
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 1
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 1, '10.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 1
            AND image_url = '10.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 1, '11.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 1
            AND image_url = '11.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 1, '12.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 1
            AND image_url = '12.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 1, '13.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 1
            AND image_url = '13.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 1, '14.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 1
            AND image_url = '14.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 1, '15.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 1
            AND image_url = '15.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 1, 2776, '2026-06-06 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 1
            AND recorded_at = '2026-06-06 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 1, 2578, '2026-09-04 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 1
            AND recorded_at = '2026-09-04 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    2,
    'https://www.rightmove.co.uk/properties/92771877',
    'Flat',
    'Furnished',
    2,
    2,
    69,
    3200,
    4000,
    3692,
    '2026-09-04',
    'An attractive modern two double bedroom apartment with an open plan kitchen/ living room, a private balcony, ample storage and two bathrooms, one of which is en-suite.

Lant Street is incredibly well located, tucked behind Borough Underground at the foot of Borough High Street, with London Bridge, Borough Market, the Shard and South Bank all within easy walking distance.',
    'London Bridge',
    'Lant Street',
    'Borough Station',
    'SE1',
    'Victoria',
    42,
    'C',
    1600
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 2
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 2, '20.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 2
            AND image_url = '20.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 2, '21.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 2
            AND image_url = '21.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 2, '22.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 2
            AND image_url = '22.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 2, '23.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 2
            AND image_url = '23.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 2, '24.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 2
            AND image_url = '24.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 2, '25.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 2
            AND image_url = '25.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 2, '26.jpeg', FALSE, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 2
            AND image_url = '26.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 2, 3446, '2026-06-06 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 2
            AND recorded_at = '2026-06-06 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 2, 3200, '2026-09-04 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 2
            AND recorded_at = '2026-09-04 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    3,
    'https://www.rightmove.co.uk/properties/92771823',
    'cottage',
    'Unfurnished',
    2,
    1,
    70.9,
    2850,
    3100,
    3288,
    '2026-09-04',
    'Beautiful two bedroom Alberts cottage available for rent through Cantell and Co. The ground floor comprises front reception room and dining area furnished with a comfortable sofa and dining table with chairs. The modern kitchen is fully equipped including dishwasher and washing machine. To the rear, the property benefits from a side lean-to extension, ideal for bike storage and private patio garden, offering excellent outdoor space. Upstairs, there is a good sized master bedroom, second bedroom is flexible accommodation and could be an ideal home office, there is also loft room for additional storage/ occasional guest bedroom. The modern bathroom includes over bath shower and shower screen.

The Alberts are a collection of charming cottages situated on the lower slopes of Richmond Hill. With the Alberts'' Deli, a great gastro pub and playground, the annual street party, and the regular community meetings; these cottages, so close to London, are highly sought after. Richmond tube and train station is within a 10-minute walk, with Waterloo 17 minutes and Victoria about 25 minutes on the train. Closer to home there are Kew Gardens and Richmond Park to explore (both a 20 minute walk), plus the riverside pubs, two theatres, an eclectic mix of boutique and High Street shops, bars, restaurants, and a lovely weekend market by the river.',
    'Richmond',
    'Albert Road',
    'Richmond upon Thames',
    'TW10',
    'Richmond',
    85,
    'D',
    5000
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 3
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '30.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '30.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '31.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '31.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '32.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '32.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '33.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '33.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '34.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '34.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '35.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '35.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '36.jpeg', FALSE, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '36.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '37.jpeg', FALSE, 7
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '37.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 3, '38.jpeg', FALSE, 8
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 3
            AND image_url = '38.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 3, 3069, '2026-06-06 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 3
            AND recorded_at = '2026-06-06 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 3, 2850, '2026-09-04 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 3
            AND recorded_at = '2026-09-04 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    4,
    'https://www.rightmove.co.uk/properties/92763174#',
    'Flat',
    'Part furnished',
    1,
    1,
    40,
    2000,
    2500,
    2300,
    '2026-09-04',
    'A beautifully presented ground floor, one bedroom Flat situated moments from Putney High Street. This property comprises of a well-appointed kitchen/reception room with ample storage and direct access to a communal garden. The Flat also benefits from a large double bedroom with an integrated wardrobe as well as a modern, good-sized bathroom.

Hill Court is a well maintained block set back from Putney Hill. The development is situated close to central Putney, Wandsworth and Wimbledon, with easy bus links and fast access to the A3. Both the Putney mainline station and East Putney underground station are also only a short walk away.

The information contained in these particulars is for general information purposes only. Douglas & Gordon does not provide information or give any warranty with regards to train, tube, tram lines or flight paths. Prospective purchasers or tenants are advised to carry out their own research if they have any concern about train, tube, tram lines or flight paths.',
    'Putney',
    'Putney Hill',
    'Wandsworth',
    'SW15',
    'Putney',
    74,
    'D',
    1600
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 4
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 4, '40.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 4
            AND image_url = '40.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 4, '41.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 4
            AND image_url = '41.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 4, '42.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 4
            AND image_url = '42.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 4, '43.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 4
            AND image_url = '43.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 4, '44.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 4
            AND image_url = '44.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 4, '45.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 4
            AND image_url = '45.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 4, 2150, '2026-06-06 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 4
            AND recorded_at = '2026-06-06 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 4, 2000, '2026-09-04 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 4
            AND recorded_at = '2026-09-04 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    5,
    'https://www.rightmove.co.uk/properties/92771472#',
    'Flat',
    'Unfurnished',
    1,
    1,
    55.6,
    2700,
    2850,
    3105,
    '2026-09-04',
    'Spectacular furnished one bedroom apartment set in Jewel House building in London Square development. The Flat comprises a large open plan living area with dual aspect, double bedroom with built in wardrobes with private balcony, modern bathroom, fully fitted kitchen and a roof terrace with views overlooking the rooftops of London''s skyline. Residents'' will benefit from a 24 hour concierge service and gym. London Square Caledonian Road is located within a short distance to Caledonian Road tube station (Piccadilly line) and Caledonian Road and Barnsbury overground station. King''s Cross St Pancras International is one stop away offering the best transport links nationally and internationally.',
    'Islington',
    'Sterling Way',
    'Islington',
    'N7',
    'Caledonian Road Station',
    48,
    'N/A',
    1600
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 5
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 5, '50.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 5
            AND image_url = '50.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 5, '51.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 5
            AND image_url = '51.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 5, '52.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 5
            AND image_url = '52.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 5, '53.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 5
            AND image_url = '53.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 5, '54.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 5
            AND image_url = '54.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 5, '55.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 5
            AND image_url = '55.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 5, '56.jpeg', FALSE, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 5
            AND image_url = '56.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 5, 2902, '2026-06-06 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 5
            AND recorded_at = '2026-06-06 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 5, 2700, '2026-09-04 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 5
            AND recorded_at = '2026-09-04 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    6,
    'https://www.rightmove.co.uk/properties/92781309#',
    'Flat',
    'Furnished',
    4,
    4,
    103,
    2500,
    3333,
    2884,
    '2026-09-05',
    'Baker and Chase are delighted to present this large 1103 sq ft. split level newly painted 4 bedroom, 1 reception, converted flat located in the heart of Palmers Green, with the added benefit of having 4 bathrooms and your own south facing roof terrace, plus newly fitted carpets throughout.

Situated on the first and second floors, this property offers 4 good size bedrooms (2 have restricted access from the eaves) , a open plan lounge/fitted kitchen which includes a washing machine, Smeg dishwasher and oven and hob. Two modern family bathrooms both with a bath plus a shower attachment. Plus two en suite shower rooms.

Devonshire Road is a quiet residential turning set in a prime Palmers Green location. Palmers Green overground Train station is on your doorstep, only 0.1 miles away, and there are many bus routes available on Alderman''s Hill; allowing easy access into Central London and Hertfordshire. Broomfield Park & Arnos Park provide easy access to some of the areas best open Green spaces. There are several key shopping areas close by, including Palmers Green triangle, Green Lanes and Southgate Circus. Morrison Supermarket is also on your doorstep.',
    'Palmers Green',
    'Devonshire Road',
    'Enfield',
    'N13',
    'Palmers Green',
    62,
    'C',
    1600
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 6
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 6, '60.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 6
            AND image_url = '60.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 6, '61.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 6
            AND image_url = '61.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 6, '62.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 6
            AND image_url = '62.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 6, '63.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 6
            AND image_url = '63.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 6, '64.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 6
            AND image_url = '64.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 6, '65.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 6
            AND image_url = '65.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 6, '66.jpeg', FALSE, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 6
            AND image_url = '66.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 6, 2692, '2026-06-07 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 6
            AND recorded_at = '2026-06-07 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 6, 2500, '2026-09-05 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 6
            AND recorded_at = '2026-09-05 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    7,
    'https://www.rightmove.co.uk/properties/91887780#',
    'Maisonette',
    'Part furnished',
    3,
    1,
    84,
    2350,
    2474,
    2711,
    '2026-09-05',
    'Equity Estate Agents are pleased to offer this spacious three-bedroom split level maisonette situated above commercial premises, presented in fully refurbished condition throughout. The property offers generous living accommodation, including a large lounge, a modern fitted kitchen, three double bedrooms, and a bathroom/WC. Additional benefits include gas central heating and UPVC double glazing, providing a comfortable and practical home for sharers or families.

The property is ideally located close to a wide range of local shops, restaurants, and amenities, with excellent transport links nearby including Winchmore Hill, Grange Park, and Southgate stations, offering easy access into Central London. This is a well-connected property in a convenient and vibrant location.',
    'Enfield',
    'Avenue Parade',
    'Enfield',
    'N21',
    'Bush Hill Park',
    56,
    'D',
    1130
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 7
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 7, '70.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 7
            AND image_url = '70.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 7, '71.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 7
            AND image_url = '71.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 7, '72.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 7
            AND image_url = '72.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 7, '73.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 7
            AND image_url = '73.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 7, '74.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 7
            AND image_url = '74.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 7, '75.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 7
            AND image_url = '75.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 7, 2530, '2026-06-07 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 7
            AND recorded_at = '2026-06-07 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 7, 2350, '2026-09-05 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 7
            AND recorded_at = '2026-09-05 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    8,
    'https://www.rightmove.co.uk/properties/92760849',
    'Flat',
    'Unfurnished',
    2,
    1,
    76,
    2100,
    2800,
    2424,
    '2026-09-03',
    'A beautiful two bedroom, first floor property in immaculate condition recently renovated to a high spec. Modern kitchen with integrated appliances as well as a new bathroom suite, neutrally decorated through out. Off street permit parking is available with in the development. Rutland Court is a sought after period mansion block with a strong community feel, located at the top of Denmark Hill, near Ruskin Park. The location is very convenient for Denmark Hill station, Dulwich village, Herne Hill and Kings College hospital. Available immediately and unfurnished.',
    'Denmark Hill',
    'Rutland Court',
    'Southwark',
    'W5',
    'Loughborough Junction',
    47,
    'N/A',
    900
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 8
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 8, '80.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 8
            AND image_url = '80.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 8, '81.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 8
            AND image_url = '81.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 8, '82.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 8
            AND image_url = '82.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 8, '83.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 8
            AND image_url = '83.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 8, '84.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 8
            AND image_url = '84.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 8, '85.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 8
            AND image_url = '85.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 8, '86.jpeg', FALSE, 6
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 8
            AND image_url = '86.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 8, 2262, '2026-06-05 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 8
            AND recorded_at = '2026-06-05 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 8, 2100, '2026-09-03 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 8
            AND recorded_at = '2026-09-03 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    9,
    'https://www.rightmove.co.uk/properties/92809998',
    'Flat',
    'Furnished',
    2,
    1,
    68,
    2200,
    2444,
    2535,
    '2026-09-01',
    'Spacious two double bedroom furnished apartment with high ceilings located in the gated development Carmine Wharf close to Westferry D.L.R. 3 Minutes to Canary Wharf. The apartment comprises of a spacious reception with fully equipped kitchen with integrated appliances, wooden flooring, floor to ceiling windows leading to the full width South facing balcony. Two large double bedrooms'' spacious hallway and large bathroom.

Offered fully furnished and in immaculate condition with the added benefit of a porter Monday - Friday.

Carmine Wharf is ideally located close to supermarkets, restaurants, and bars.',
    'Limehouse',
    'Carmine Wharf',
    'Tower Hamlets',
    'E14',
    'Tower Hamlets',
    42,
    'C',
    74
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 9
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 9, '90.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 9
            AND image_url = '90.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 9, '91.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 9
            AND image_url = '91.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 9, '92.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 9
            AND image_url = '92.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 9, '93.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 9
            AND image_url = '93.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 9, 2367, '2026-06-03 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 9
            AND recorded_at = '2026-06-03 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 9, 2200, '2026-09-01 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 9
            AND recorded_at = '2026-09-01 09:00:00'
    );

INSERT INTO
    listings (
        id,
        source_url,
        property_type,
        furnished,
        bedrooms,
        bathrooms,
        size_sqm,
        price_per_month,
        original_price,
        deposit,
        listed_at,
        description,
        area,
        street,
        borough,
        postcode,
        nearest_station,
        crime_score,
        energy_rating,
        internet_speed_mbps
    )
SELECT
    10,
    'https://www.rightmove.co.uk/properties/92749203#/?channel=RES_LET',
    'Flat',
    'Unfurnished',
    1,
    1,
    51,
    2330,
    3883,
    2688,
    '2026-09-04',
    'Berkeley Living is proud to present Navigator Place, a place to call home in the heart of Kidbrooke Village, where brand new apartments, great amenity spaces and a dedicated on-site team come together to make everyday living easier.

With prices starting from £2,250 per month, our limited supply of one-bedroom apartments offers beautiful open-plan kitchens with integrated appliances, stylish bathrooms, spacious bedrooms with built-in wardrobes and bright, functional living spaces, making them ideal for individuals or couples alike. All apartments benefit from keyless entry, private outdoor space, and are available in a variety of layouts and sizes.

Living at Navigator Place means more than simply having a place to stay - it''s about having a home and community that supports your day-to-day life. Each apartment has been carefully planned to make the most of space and natural flow, while shared facilities give you the freedom to step outside your front door and enjoy all Navigator Place has to offer. From a residents'' lounge, with co-working space, to a well-equipped in-house gym, residents'' terrace and regular resident events, there are plenty of opportunities to get to know your neighbours and feel part of the community. Whether you''re starting the day with a workout, catching up on emails in the co-working space, or unwinding in the residents'' lounge in the evening, the spaces around you are designed to support everyday living.

Apartments are beautifully furnished, with a small selection of unfurnished options available. Free Wi-Fi is included for all residents, helping you settle in quickly and stay connected from day one.

With prices starting from £2,250 per month, our limited supply of one-bedroom apartments offers beautiful open-plan kitchens with integrated appliances, stylish bathrooms, spacious bedrooms with built-in wardrobes and bright, functional living spaces, making them ideal for individuals or couples alike. All apartments benefit from keyless entry, private outdoor space, and are available in a variety of layouts and sizes.

Living at Navigator Place means more than simply having a place to stay - it''s about having a home and community that supports your day-to-day life. Each apartment has been carefully planned to make the most of space and natural flow, while shared facilities give you the freedom to step outside your front door and enjoy all Navigator Place has to offer. From a residents'' lounge, with co-working space, to a well-equipped in-house gym, residents'' terrace and regular resident events, there are plenty of opportunities to get to know your neighbours and feel part of the community. Whether you''re starting the day with a workout, catching up on emails in the co-working space, or unwinding in the residents'' lounge in the evening, the spaces around you are designed to support everyday living.

Apartments are beautifully furnished, with a small selection of unfurnished options available. Free Wi-Fi is included for all residents, helping you settle in quickly and stay connected from day one.',
    'Kidbrooke',
    'Harler House',
    'Greenwich',
    'se3',
    'Kidbrooke Station',
    60,
    'N/A',
    1200
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listings
        WHERE
            id = 10
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 10, '100.jpeg', TRUE, 0
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 10
            AND image_url = '100.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 10, '101.jpeg', FALSE, 1
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 10
            AND image_url = '101.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 10, '102.jpeg', FALSE, 2
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 10
            AND image_url = '102.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 10, '103.jpeg', FALSE, 3
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 10
            AND image_url = '103.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 10, '104.jpeg', FALSE, 4
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 10
            AND image_url = '104.jpeg'
    );

INSERT INTO
    listing_images (
        listing_id,
        image_url,
        is_hero,
        display_order
    )
SELECT 10, '105.jpeg', FALSE, 5
WHERE
    NOT EXISTS (
        SELECT 1
        FROM listing_images
        WHERE
            listing_id = 10
            AND image_url = '105.jpeg'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 10, 2509, '2026-06-06 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 10
            AND recorded_at = '2026-06-06 09:00:00'
    );

INSERT INTO
    price_history (
        listing_id,
        price_per_month,
        recorded_at
    )
SELECT 10, 2330, '2026-09-04 09:00:00'
WHERE
    NOT EXISTS (
        SELECT 1
        FROM price_history
        WHERE
            listing_id = 10
            AND recorded_at = '2026-09-04 09:00:00'
    );
