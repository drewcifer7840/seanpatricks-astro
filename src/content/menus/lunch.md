---
title: Lunch Menu
summary: Dine in · Available daily
service: lunch
priceTier: $$
sections:
  - heading: Starters & Soups
    items:
      - name: Stuffed Hot Banana Peppers
        description: "Three cheeses, secret stuffing, red sauce, garlic toast."
        price: "$14.50"
        signature: true
        badges: [signature]
      - name: Stuffed Mushroom Caps
        description: "Shrimp, crab, cheddar cheese."
        price: "$14.50"
      - name: Bruschetta
        description: "Garlic, olive oil, tomatoes, basil, Romano cheese."
        price: "$9.50"
      - name: Baked Pretzels
        description: "Honey mustard and cheese sauce."
        price: "$12.50"
      - name: Potato Skins
        description: "Cheddar, bacon, scallions, sour cream."
        price: "$13.50"
      - name: Mini Weck and Wings
        description: "3 oz. mini beef on weck, 5 wings, celery, carrots, bleu cheese."
        price: "$16.00"
        badges: [new]
      - name: Crab Cakes (2)
        description: "Special lump crab, field greens, spicy aioli."
        price: "$24.00"
        signature: true
        badges: [signature]
      - name: Fantail Shrimp
        description: "Breaded shrimp, raspberry melba sauce."
        price: "$14.00"
      - name: Chicken Fingers
        description: "Breaded strips, fries, bleu cheese, celery, carrots."
        price: "$16.00"
      - name: Chicken Wings
        description: "Mild, medium, hot, BBQ, or Cajun."
        priceOptions:
          - { label: "10 pc", value: "$16" }
          - { label: "20 pc", value: "$31" }
      - name: Garlic Bread
        description: "Garlic and provolone. Add spinach +$3.00."
        price: "$8.50"
        badges: [new-addon]
      - name: Soup O' the Day
        description: "Homemade daily."
        priceOptions:
          - { label: "Cup", value: "$5.75" }
          - { label: "Bowl", value: "$6.75" }
        signature: true
        badges: [signature]
      - name: Irish Potato Soup
        description: "Fried potato crunchies and scallions."
        priceOptions:
          - { label: "Cup", value: "$6.25" }
          - { label: "Bowl", value: "$7.25" }
        signature: true
        badges: [signature]
      - name: French Onion Soup
        description: "Sherry, croutons, provolone."
        priceOptions:
          - { label: "Cup", value: "$6.75" }
          - { label: "Bowl", value: "$8.00" }
        signature: true
        badges: [signature]
      - name: Homemade Meatballs
        description: "Red sauce, ricotta, garlic toast."
        price: "$12.50"
      - name: Reuben Egg Rolls
        description: "Corned beef, sauerkraut, swiss, dipping sauce."
        price: "$13.50"
      - name: Flatbreads
        description: "Choose one: Cheese & Pepperoni, Bruschetta, or Margarita (cherry tomatoes, basil, garlic & oil, parmesan, balsamic glaze)."
        price: "$15.00"

  - heading: Greens
    items:
      - name: Chef Salad
        description: "Fresh crisp greens with garnishes."
        priceOptions:
          - { label: "Large", value: "$12" }
          - { label: "Side", value: "$6.50" }
        badges: [gf]
      - name: Caesar Salad
        description: "Romaine, croutons, Caesar dressing, asiago, tomatoes."
        priceOptions:
          - { label: "Large", value: "$12" }
          - { label: "Side", value: "$8" }
        badges: [gf]
      - name: Julienne Salad
        description: "Ham, turkey, cheeses, and garnishes."
        price: "$16.50"
        badges: [gf]
      - name: Chicken Souvlaki Salad
        description: "Marinated chicken, tomato, feta, Greek dressing, warm pita bread."
        price: "$16.00"
        badges: [gf]
      - name: Salmon Salad
        description: "Char-grilled salmon atop mixed greens, honey mustard dressing."
        price: "$23.00"
        badges: [gf]
      - name: Signature Salad
        description: "Strawberries, pistachios, crumbly bleu cheese."
        priceOptions:
          - { label: "Full", value: "$14" }
          - { label: "Shrimp", value: "$7.50" }
        signature: true
        badges: [signature, gf]
      - name: Cajun Chicken Salad
        description: "Cajun seasoned breast, hardboiled egg, cheddar, honey mustard dressing, garlic toast."
        price: "$17.00"
        badges: [gf]
    footnote: "<strong>Protein add-ons:</strong> Chicken +$6.50 &nbsp;·&nbsp; Shrimp +$7.50 &nbsp;·&nbsp; Salmon +$11.00"

  - heading: Hand Helds
    items:
      - name: Lunch Express
        description: "Cup of soup & sandwich. Turkey, Ham, Roast Beef, Corned Beef, or Tuna. Upgrade to French Onion +$2.00."
        price: "$14.50"
      - name: The Clubs
        description: "Triple-decker with bacon, lettuce, tomato, mayo. Turkey · Ham · Roast Beef · Corned Beef · Tuna."
        price: "$15.50"
      - name: B.L.T.
        description: "Bacon, lettuce, tomato, mayo."
        price: "$12.50"
      - name: The Dublin
        description: "Sliced turkey, ham, tomatoes on rye, special dressing, smothered with swiss, baked."
        price: "$16.00"
        signature: true
        badges: [signature]
      - name: The Reuben
        description: "Lean corned beef on rye, Thousand Island, swiss, sauerkraut."
        price: "$16.00"
        signature: true
        badges: [signature]
      - name: Albacore Tuna Melt
        description: "Solid white Albacore, sliced tomato, cheddar. Open faced or closed."
        price: "$15.50"
      - name: Panini
        description: "Made fresh daily, served hot off the press."
        price: "$15.00"
      - name: Wrap or Pita Pocket
        description: "Changes daily."
        price: "$14.50"
    footnote: "<strong>Bread:</strong> White · Whole Wheat · Rye &nbsp;·&nbsp; <strong>Includes:</strong> Chips or Coleslaw &nbsp;·&nbsp; <strong>Upgrades:</strong> Fries +$1.00 &nbsp;·&nbsp; Fresh Fruit +$1.00 &nbsp;·&nbsp; Sweet Potato Fries +$2.00"

  - heading: Between the Buns
    items:
      - name: Sean Patrick's Burger
        description: "Lettuce, tomato, choice of cheese."
        price: "$15.00"
      - name: Sunrise Burger
        description: "Bacon, sunny side egg, pepper jack, red onion, tomato, special sauce."
        price: "$16.00"
      - name: Irish Reuben Burger
        description: "Corned beef, swiss, coleslaw, Thousand Island."
        price: "$16.00"
      - name: Salmon Burger
        description: "Lettuce, tomato, chipotle aioli."
        price: "$16.00"
      - name: Tenderloin Sandwich
        description: "Sliced tenderloin, garlic roll, lettuce, tomato, French fries."
        price: "$24.00"
        signature: true
        badges: [signature]
      - name: Beef on Weck
        description: "Generous portion of tender sliced beef on Kummelweck."
        price: "$15.00"
        signature: true
        badges: [signature]
      - name: Chicken Breast Sandwich
        description: "Marinated boneless breast, charbroiled, lettuce and tomato. Add Bacon & Cheddar +$3.00 · Spinach & Provolone +$3.00."
        price: "$15.00"
        badges: [new-addon]
      - name: Fried Bologna & Onions
        description: "Traditional favorite, thickly sliced German bologna."
        price: "$13.00"
    footnote: "<strong>Cheese add-on</strong> (Swiss, American, Cheddar, Provolone, Pepper Jack) +$1.50 &nbsp;·&nbsp; <strong>Mushrooms</strong> +$1.50 &nbsp;·&nbsp; <strong>Onions</strong> +$1.50 &nbsp;·&nbsp; <strong>Bacon</strong> +$2.50"

  - heading: Luncheon Entrées
    items:
      - name: Spaghetti
        description: "House sauce or garlic and oil. One meatball +$3.25 · Two meatballs +$6.00."
        price: "$12.00"
      - name: Charbroiled Salmon
        description: "Atlantic salmon fillet, rice pilaf and vegetables."
        price: "$24.00"
        badges: [gf]
      - name: Broiled Haddock
        description: "Lemon and butter, rice and vegetables."
        price: "$19.00"
        badges: [gf]
      - name: Charbroiled Chicken
        description: "Plain, BBQ, or Cajun, with rice and vegetables."
        price: "$18.00"
        badges: [gf]
      - name: Shepherd's Pie
        description: "Ground beef, steak, corn, carrots, peas, piped mashed potatoes."
        price: "$18.00"
      - name: Hot Roast Beef
        description: "Open or closed on white bread, vegetables, mashed potatoes and gravy."
        price: "$16.00"
      - name: Hot Roast Turkey
        description: "Open or closed, stuffing, vegetables, mashed potatoes and gravy."
        price: "$17.00"
      - name: Corned Beef and Cabbage
        description: "Red potatoes, cabbage, carrots."
        price: "$19.00"
        signature: true
        badges: [signature]
      - name: Famous Fish Fry
        description: "Beer battered or broiled, coleslaw and fries."
        price: "$19.50"
    footnote: "<strong>Haddock upgrades:</strong> Cajun +$1.00 &nbsp;·&nbsp; Bruschetta +$3.00 &nbsp;·&nbsp; Spinach & Provolone +$3.00"
---
