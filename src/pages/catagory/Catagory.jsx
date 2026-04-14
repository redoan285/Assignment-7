// ট্যাগ থেকে ক্যাটাগরি বানানো (WORK, FAMILY, HOBBY, TRAVEL ইত্যাদি)

    export   const getCategoryLabel = (tag) => {

        const lowerTag = tag.toLowerCase();

        if (lowerTag.includes('work') || lowerTag.includes('coworker') || lowerTag.includes('job')) return 'WORK';

        if (lowerTag.includes('family') || lowerTag.includes('sister') || lowerTag.includes('brother') || lowerTag.includes('cousin')) return 'FAMILY';

        if (lowerTag.includes('hobby') || lowerTag.includes('music') || lowerTag.includes('book') || lowerTag.includes('dnd') || lowerTag.includes('game')) return 'HOBBY';

        if (lowerTag.includes('travel') || lowerTag.includes('adventure')) return 'TRAVEL';

        if (lowerTag.includes('college') || lowerTag.includes('university') || lowerTag.includes('school')) return 'COLLEGE';

        if (lowerTag.includes('gym') || lowerTag.includes('fitness')) return 'FITNESS';

        if (lowerTag.includes('church') || lowerTag.includes('volunteer')) return 'SERVICE';

        return tag.toUpperCase().slice(0, 8);

    };
