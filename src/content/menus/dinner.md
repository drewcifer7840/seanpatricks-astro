---
title: Dinner Menu
summary: Dine in · Evening service
service: dinner
priceTier: $$$
sections:
  - heading: Starters & Soups
    items:
      - name: Stuffed Hot Banana Peppers
        description: "Three cheeses, secret stuffing, red sauce, garlic toast."
        price: "$14.50"
        signature: true
        badges: [signature]
      - name: Stuffed Mushrooms
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
        description: "Breaded strips, French fries, bleu cheese, celery, carrots."
        price: "$16.00"
      - name: Chicken Wings
        description: "Mild, medium, hot, BBQ +$1.00, or Cajun +$1.00."
        priceOptions:
          - { label: "10 pc", value: "$16" }
          - { label: "20 pc", value: "$31" }
      - name: Garlic Bread
        description: "Garlic and provolone. Add spinach +$3.00."
        price: "$8.50"
      - name: Homemade Meatballs
        description: "Red sauce, ricotta, garlic toast."
        price: "$12.50"
      - name: Reuben Egg Rolls
        description: "Corned beef, sauerkraut, swiss, dipping sauce."
        price: "$13.50"
      - name: Flatbreads
        description: "Choose one: Cheese & Pepperoni, Bruschetta, or Margarita."
        price: "$15.00"
      - name: Soup O' the Day
        description: "Homemade daily."
        priceOptions:
          - { label: "Cup", value: "$5.75" }
          - { label: "Bowl", value: "$6.75" }
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

  - heading: Greens
    items:
      - name: Chef Salad
        description: "Fresh crisp greens with garnishes."
        priceOptions:
          - { label: "Large", value: "$13" }
          - { label: "Side", value: "$7" }
        badges: [gf]
      - name: Caesar Salad
        description: "Romaine, croutons, Caesar dressing, asiago, tomatoes."
        priceOptions:
          - { label: "Large", value: "$13" }
          - { label: "Side", value: "$8.50" }
        badges: [gf]
      - name: Julienne Salad
        description: "Ham, turkey, cheeses, and garnishes."
        price: "$17.50"
        badges: [gf]
      - name: Chicken Souvlaki Salad
        description: "Marinated chicken, tomato, feta, Greek dressing, warm pita bread."
        price: "$17.00"
        badges: [gf]
      - name: Salmon Salad
        description: "Char-grilled salmon atop mixed greens, honey mustard dressing."
        price: "$24.00"
        badges: [gf]
      - name: Signature Salad
        description: "Strawberries, pistachios, crumbly bleu cheese."
        price: "$15.00"
        signature: true
        badges: [signature, gf]
      - name: Cajun Chicken Salad
        description: "Cajun seasoned breast, hardboiled egg, cheddar, honey mustard dressing."
        price: "$18.00"
        badges: [gf]
    footnote: "<strong>Protein add-ons:</strong> Chicken +$6.50 &nbsp;·&nbsp; Shrimp +$7.50 &nbsp;·&nbsp; Salmon +$11.00"

  - heading: Between the Buns & Hand Helds
    note: "Served with French fries and pickle."
    items:
      - name: Sean Patrick's Burger
        description: "Lettuce, tomato, choice of cheese."
        price: "$17.00"
      - name: Sunrise Burger
        description: "Bacon, sunny side egg, pepper jack, red onion, tomato, special sauce."
        price: "$18.00"
      - name: Irish Reuben Burger
        description: "Corned beef, swiss, coleslaw, Thousand Island."
        price: "$18.50"
        signature: true
        badges: [signature]
      - name: Salmon Burger
        description: "Lettuce, tomato, chipotle aioli."
        price: "$17.00"
      - name: Beef on Weck
        description: "Sliced beef on Kummelweck roll."
        price: "$16.00"
        signature: true
        badges: [signature]
      - name: Chicken Breast Sandwich
        description: "Marinated breast, charbroiled. Add Bacon & Cheddar +$3.00 · Spinach & Provolone +$3.00."
        price: "$17.00"
      - name: Fried Bologna & Onions
        description: "Thickly sliced German bologna."
        price: "$14.00"
      - name: Tenderloin Sandwich
        description: "Sliced tenderloin, garlic roll, lettuce, tomato."
        price: "$24.00"
        signature: true
        badges: [signature]
      - name: The Dublin
        description: "Turkey, ham, tomatoes, rye, special dressing, swiss."
        price: "$17.50"
        signature: true
        badges: [signature]
      - name: The Reuben
        description: "Corned beef, rye, Thousand Island, swiss, sauerkraut."
        price: "$17.50"
        signature: true
        badges: [signature]
      - name: Albacore Tuna Melt
        description: "White tuna, tomato, cheddar, open or closed."
        price: "$17.50"
    footnote: "<strong>Cheese add-on</strong> (Swiss, American, Cheddar, Provolone, Pepper Jack) +$1.50 &nbsp;·&nbsp; <strong>Mushrooms</strong> +$1.50 &nbsp;·&nbsp; <strong>Onions</strong> +$1.50 &nbsp;·&nbsp; <strong>Bacon</strong> +$2.50"

  - heading: Dinner Entrées
    note: "Served with vegetables and choice of one side. Bread and butter available on request."
    items:
      - name: Crab Cake Dinner
        description: "Special lump crab over field greens, spicy aioli."
        price: "$28.00"
        signature: true
        badges: [signature]
      - name: Potato Encrusted Haddock
        description: "Haddock fillet in potato crumbs, lobster cream sauce."
        price: "$25.00"
      - name: Shrimp Scampi
        description: "Sautéed shrimp, lemon, butter, white wine, over rice or vermicelli."
        price: "$24.00"
      - name: Charbroiled Salmon
        description: "Honey mustard glaze with choice of side."
        price: "$27.00"
        badges: [gf]
      - name: Broiled Haddock
        description: "Lemon and butter."
        price: "$21.00"
        badges: [gf]
      - name: Fantail Shrimp (8)
        description: "Golden brown, lemon, cocktail sauce."
        price: "$21.00"
      - name: Filet Mignon (7 oz.)
        description: "Center cut, garlic toast, onion ring."
        price: "$39.00"
        badges: [gf]
      - name: New York Strip (12 oz.)
        description: "Choice NY strip, garlic toast, onion ring."
        price: "$37.00"
        badges: [gf]
      - name: Charbroiled Porkchop (14 oz.)
        description: "Center cut, apple chutney."
        price: "$27.00"
        signature: true
        badges: [signature, gf]
      - name: Liver & Onions
        description: "Sautéed calves' liver, onions, bacon."
        price: "$21.00"
      - name: Shepherd's Pie
        description: "Ground beef, steak, corn, carrots, peas, mashed potatoes."
        price: "$21.00"
        signature: true
        badges: [signature]
      - name: Famous Fish Fry
        description: "Beer battered or broiled, coleslaw and fries."
        price: "$19.50"
      - name: Chicken Florentine
        description: "Grilled chicken, mushrooms, tomatoes, spinach, vermicelli, asiago."
        price: "$25.00"
        badges: [new]
      - name: Chicken Bryan
        description: "Artichokes, sundried tomatoes, basil, goat cheese, lemon butter."
        price: "$26.00"
        signature: true
        badges: [signature]
      - name: Charbroiled Chicken
        description: "Plain, BBQ, or Cajun."
        price: "$23.00"
        badges: [gf]
      - name: Chicken Parm
        description: "Breaded breast, provolone, over spaghetti."
        price: "$24.00"
      - name: Spaghetti
        description: "House sauce or garlic and oil. One meatball +$3.50 · Two +$6.50 · Parmesan +$2.50."
        price: "$17.00"
      - name: Roast Turkey Dinner
        description: "Stuffing, vegetables, mashed potatoes and gravy."
        price: "$23.00"
      - name: Corned Beef and Cabbage
        description: "Red potatoes, cabbage, carrots."
        price: "$21.00"
        signature: true
        badges: [signature]
    footnote: "<strong>Haddock upgrades:</strong> Cajun +$1.00 &nbsp;·&nbsp; Bruschetta +$3.00 &nbsp;·&nbsp; Spinach &amp; Provolone +$3.00"

  - heading: Sides & Add-Ons
    layout: sides
    groups:
      - title: Side Options
        items:
          - Baked Potato
          - Rice Pilaf
          - Spaghetti
          - French Fries
          - Mashed Potatoes
          - Coleslaw
          - Broccoli
          - Vegetable of the Day
          - 'Sweet Potato Fries <span style="color:var(--text-muted)">+$2.00</span>'
      - title: Entrée Add-Ons
        items:
          - 'Dinner Salad to Entrée &nbsp;+$4.00'
          - 'Mushrooms, Onions, or Crumbly Bleu &nbsp;+$2.00'
          - 'Banana Pepper &nbsp;+$3.00'
          - 'Shrimp (3) &nbsp;+$7.00'
          - 'Spaghetti — One Meatball +$3.50 · Two +$6.50 · Parmesan +$2.50'
          - 'Haddock — Cajun +$1.00 · Bruschetta +$3.00 · Spinach &amp; Provolone +$3.00'
---
